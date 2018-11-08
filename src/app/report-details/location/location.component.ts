import { Component, OnInit, OnDestroy , ViewChild,ElementRef} from '@angular/core';
import { ILocation } from '../../ILocation';
import { LocationService } from '../../services/location.service';
import { DataTableResource } from 'angular5-data-table';
import { Subscription } from 'rxjs';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import * as FileSaver from 'file-saver';
import { CdkTableModule } from '@angular/cdk/table';
import { element } from 'protractor';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})

export class LocationComponent implements OnInit{
  errorMessage: string;
  filterBy : string;
  locations: ILocation[];
  subscription:Subscription;
  limits = [5, 10, 20, 80];
  tableResource : DataTableResource<ILocation>;
  displayedColumns = ['locationName', 'address', 'city', 'country.countryName','zipcode', 'phone','timezone','action'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild('TABLE',{ read: ElementRef }) table: ElementRef;

  nextPageLinkValue:string = '/admin/location/new';
  editPageLink:string= "['/admin/location/edit/',location.locationID]";
  queryParamsValue :string = "{countryName:location.country,cityName:location.city}"
  EXCEL_EXTENSION='.xlsx';
  ShowLabel:any = ["LOCATION","ADDRESS","CITY","COUNTRY","Phone","ZIPCODE","TIMEZONE"];

  constructor( private locationService: LocationService,private confirmationDialogService: ConfirmationDialogService) { }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  ngOnInit() {  
    this.getLocations();     
  }

  getLocations():any{
    this.locationService.getLocations()
    .subscribe((locations:ILocation[]) =>{
       this.locations = locations;
       this.dataSource = new MatTableDataSource(locations);
       this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
        return key === 'country' ? currentTerm + data.country.countryName : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch(property) {
          case 'country.countryName': return item.country.countryName;
          default: return item[property];
        }
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => this.errorMessage = <any>error);  
  }

  deleteLocation(location:ILocation,id:Number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this contact information?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.locationService.deleteLocation(id)
          .subscribe((data)=> {
            this.getLocations();
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].locationID;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Location_Details",this.ShowLabel);   
  }
  
  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';    
    if (ShowLabel) {
      let row = "";
      for(let index in ShowLabel) {
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
            data = data.countryName;
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




