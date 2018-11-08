import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { LocationPocService } from '../../services/location-poc.service';
import { ILocationPOC } from '../../ILocationPOC';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import { DataTableResource } from 'angular5-data-table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-location-point-of-contact',
  templateUrl: './location-point-of-contact.component.html',
  styleUrls: ['./location-point-of-contact.component.css']
})
export class LocationPointOfContactComponent implements OnInit {
  errorMessage:string;
  locationPOC:ILocationPOC[];
  tableResource : DataTableResource<ILocationPOC>;
  displayedColumns = ['location.locationName', 'contactName', 'email','phone','title','action'];
  dataSource;
  ShowLabel:any=["LOCATION","CONTACT NAME","EMAIL","PHONE NUMBER","TITLE"];
  nextPageLinkValue:string='/admin/locationPOC/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  

  constructor(private locationPOCService : LocationPocService,private confirmationDialogService: ConfirmationDialogService) { }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  ngOnInit() {
    this.getAll();
  }

  getAll():any{
    this.locationPOCService.getLocationPOC()
    .subscribe(locationPOC =>{
        this.locationPOC = locationPOC;
        this.dataSource = new MatTableDataSource(locationPOC);
        this.dataSource.filterPredicate = (data, filter: string)  => {
            const accumulator = (currentTerm, key) => {
            return key === 'location' ? currentTerm + data.location.locationName : currentTerm + data[key];
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'location.locationName': return item.location.locationName;
              default: return item[property];
            }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    },
    error => this.errorMessage = <any>error)
  }

  deleteContact(contactId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this contact information?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.locationPOCService.deleteLocationPOC(contactId)
          .subscribe((data)=> {
             this.getAll();
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].id;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Location_POC_Details",this.ShowLabel);   
  }
  
  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';    
    if (ShowLabel) {
      let row = "";
      for (let index in ShowLabel) {
        row += ShowLabel[index]+ ',';
      }
      row = row.slice(0, -1);
      CSV += row + '\r\n';
    }  
    for(let i in arrData){
      let row = "";
      for (let index in arrData[i]) {
        let data = arrData[i][index];
        if(typeof data === 'object' && data != null){
            data = data.locationName;
        }
        row += '"' + data + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }
    if (CSV == '') {        
      alert("Invalid data");
      return;
    }   
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.download = ReportTitle + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
