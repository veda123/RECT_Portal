import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service'
import { ILocationCapability } from '../../ILocationCapability';
import { LocationCapabilityService } from '../../services/location-capability.service';

@Component({
  selector: 'app-location-capability',
  templateUrl: './location-capability.component.html',
  styleUrls: ['./location-capability.component.css']
})
export class LocationCapabilityComponent implements OnInit {
  displayedColumns = ['repairCapability.equipment.equipmentname','repairCapability.lrupartnumber','repairCapability.lrudescription','location.locationName','establishedDate',"action"];
  locationCap:ILocationCapability[];
  dataSource;
  ShowLabel:any=["TEST SET NAME","LRU PART NUMBER","LRU DESCRIPTION","LOCATION","ESTABLISHED DATE"];
  errorMessage:string;
  nextPageLinkValue:string='/admin/repairCapability/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private locationCapService:LocationCapabilityService,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getAllLocationCapability();
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  deleteLocationCapability(locCapabilityId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this Repair Capability?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.locationCapService.deleteLocationCapability(locCapabilityId)
          .subscribe((data)=> {
            this.getAllLocationCapability()
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getAllLocationCapability():any{
    this.locationCapService.getLocationCapability()
      .subscribe(locationCap =>{
        this.locationCap = locationCap;
        this.dataSource = new MatTableDataSource(locationCap);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if(key === 'repairCapability'){
              if(data.repairCapability.lrupartnumber.toLowerCase().includes(filter))
                return currentTerm + data.repairCapability.lrupartnumber;
              else if(data.repairCapability.lrudescription.toLowerCase().includes(filter))
                return currentTerm + data.repairCapability.lrudescription;
              else 
                return currentTerm + data.repairCapability.equipment.equipmentname;
              }
              else if(key === 'location'){
                return currentTerm + data.location.locationName;
              }
              else{
                return currentTerm + data[key];
              }
            };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'repairCapability.equipment.equipmentname': return item.repairCapability.equipment.equipmentname;
            case 'repairCapability.lrupartnumber': return item.repairCapability.lrupartnumber;
            case 'repairCapability.lrudescription': return item.repairCapability.lrudescription;
            case 'location.locationName': return item.location.locationName;
            default: return item[property];
          }         
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } ,
    error => this.errorMessage = <any>error)
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].locationCapID;
    }
    this.JSONToCSVConvertor(clonedDataSource,"RepairCapability_Details",this.ShowLabel);   
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
        let data:any= arrData[i][index];
        if(typeof data === 'object' && data != null){
          if(data.equipment != null)
          {
            data = data.equipment.equipmentname + '",' + '"' + data.lrupartnumber + '",' + '"' + data.lrudescription;
            // data = value +  '",' + '"' + data.lrupartnumber;
          }
          if(data.locationID != null)
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
