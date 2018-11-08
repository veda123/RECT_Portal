import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { RepairToolsService } from '../../services/repair-tools.service';
import { IRepairTools } from '../../IRepairTools';
import { count } from 'rxjs/operator/count';
import { RepairCapabilityService } from '../../services/repair-capability.service';

@Component({
  selector: 'app-repair-capability',
  templateUrl: './repair-capability.component.html',
  styleUrls: ['./repair-capability.component.css']
})
export class RepairCapabilityComponent implements OnInit {
  displayedColumns = ['repairCapability.equipment.equipmentname','repairCapability.lrupartnumber','repairCapability.lrudescription','equipment.equipmentname','equipment.description',
                      'equipment.equipmentPartNumber','quantity','repairCapability.cmm','action'];
  repairTool:IRepairTools[]= [];
  dataSource;
  errorMessage:string;

  ShowLabel:any[]=["TEST SET","LRU PARTNUMBER","LRU DESCRIPTION","CMM","TOOL NAME","TOOL DESCRIPTION","TOOL PART NUMBER","QUANTITY"];
  nextPageLinkValue:string='/admin/Repair-kits/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
          
  constructor(private confirmationDialogService:ConfirmationDialogService, private repairToolService:RepairToolsService, 
              private repairCapService:RepairCapabilityService) { }

  ngOnInit() {
    this.getRepairCapability();
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }
  
  deleteRepairTool(toolId:number, repairId:number){
    let existsCount:number = 0;
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this Repair Capability?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.repairToolService.deleteRepairTool(toolId)
          .subscribe((data)=> {
            this.getRepairCapability();
            this.repairToolService.getTools()
                .subscribe((repairToolData) =>{
                  repairToolData.forEach(function(val){
                    if (val.repairCapability.capabilityId === repairId)
                      existsCount = existsCount + 1 ;
                    })
                    if(existsCount === 0){
                      this.repairCapService.deleteRepairCapability(repairId)
                          .subscribe((data) =>this.getRepairCapability())
                    }
                })
          },
          (error)=> this.errorMessage = <any>error);   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getRepairCapability():any{
    this.repairToolService.getTools()
        .subscribe(repairTool =>{
        this.repairTool = repairTool;
        this.dataSource = new MatTableDataSource(repairTool);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if(key === 'repairCapability'){
              if(data.repairCapability.lrupartnumber.toLowerCase().includes(filter))
                return currentTerm + data.repairCapability.lrupartnumber;
              else if(data.repairCapability.lrudescription.toLowerCase().includes(filter))
                return currentTerm + data.repairCapability.lrudescription;
              else if(data.repairCapability.equipment.equipmentname.toLowerCase().includes(filter))
                return currentTerm + data.repairCapability.equipment.equipmentname;
              else 
                return currentTerm + data.repairCapability.cmm;
              }
              else if(key === 'equipment'){
                if(data.equipment === null){
                  return currentTerm + "";
                }
                else{
                  if(data.equipment.equipmentname.toLowerCase().includes(filter))
                    return currentTerm + data.equipment.equipmentname;
                  else if(data.equipment.description.toLowerCase().includes(filter))
                    return currentTerm + data.equipment.description;
                  else
                    return currentTerm + data.equipment.equipmentPartNumber;     
                }                
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
          case 'repairCapability.lrupartnumber': return item.repairCapability.lrupartnumber;
          case 'repairCapability.lrudescription': return item.repairCapability.lrudescription;
          case 'repairCapability.equipment.equipmentname': return item.repairCapability.equipment.equipmentname;
          case 'repairCapability.cmm': return item.repairCapability.cmm;
          default: return item[property];
        }    
      };
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error => this.errorMessage = <any>error)
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].repairToolId;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Repair-Kit_Details",this.ShowLabel);   
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
        if(typeof data === 'object'){
          if (data === null)
            data = null +  '",' + '"' + null +  '",' + '"' + null;
          else if(data.equipment != null)
            data = data.equipment.equipmentname +  '",' + '"' + data.lrupartnumber +  '",' + '"' + data.lrudescription + '",' + '"' + data.cmm;
          else
            data = data.equipmentname +  '",' + '"' + data.description +  '",' + '"' + data.equipmentPartNumber;  
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
