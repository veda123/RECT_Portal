import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { Itps } from '../../Itps';
import { TpsService } from '../../services/tps.service';

@Component({
  selector: 'app-tps',
  templateUrl: './tps.component.html',
  styleUrls: ['./tps.component.css']
})
export class TpsComponent implements OnInit {
  displayedColumns = ['repairCapability.equipment.equipmentname', 'repairCapability.lrupartnumber', 'tpsName', 'tpsPartnumber','version','releaseDate','checksum','checksumType',
                      'comments','releaseNotes','action'];
  tps:Itps[];
  dataSource;
  errorMessage:string;
  ShowLabel:any[]=["TEST SET","LRU PARTNUMBER","TPS NAME","TPS PARTNUMBER","VERSION","RELEASE DATE","CHECKSUM","CHECKSUM TYPE","COMMENTS","RELEASE NOTES"];
  nextPageLinkValue:string='/admin/tps/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private confirmationDialogService: ConfirmationDialogService, private tpsService:TpsService) { }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  ngOnInit() {
    this.getTPSDetails();
  }

  getTPSDetails():any{
    this.tpsService.getTPS()
      .subscribe(tps =>{
        this.tps = tps;
        this.dataSource = new MatTableDataSource(tps);
        this.dataSource.filterPredicate = (data, filter: string)  => {
            const accumulator = (currentTerm, key) => {
              if(key === 'repairCapability'){
                if(data.repairCapability.lrupartnumber.toLowerCase().includes(filter))
                  return currentTerm + data.repairCapability.lrupartnumber;
                else 
                  return currentTerm + data.repairCapability.equipment.equipmentname;
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
              case 'repairCapability.equipment.equipmentname': return item.repairCapability.equipment.equipmentname;
              default: return item[property];
            }
         
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    },
    error => this.errorMessage = <any>error)
  }

  deleteTPS(tpsId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete tps details?")
    .then((confirmed) =>{ 
       if(!confirmed) return;
       this.tpsService.deleteTPS(tpsId)
          .subscribe((data)=> {
             this.getTPSDetails()
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].tpsId;
    }
    this.JSONToCSVConvertor(clonedDataSource,"TPS_Details",this.ShowLabel);   
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
            let value = data.equipment.equipmentname;
            data = value +  '",' + '"' + data.lrupartnumber;
          }      
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
