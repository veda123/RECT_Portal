import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { IEquipment } from '../../IEquipment';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  displayedColumns = ['equipmentname', 'equipmentPartNumber', 'description','equipmentType.equipmentType','action'];
  equipment:IEquipment[];
  dataSource;
  errorMessage:string;
  ShowLabel:any[]=["EQUIPMENT","PART NUMBER","DESCRIPTION","EQUIPMENT TYPE"];
  nextPageLinkValue:string='/admin/equipment/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private confirmationDialogService: ConfirmationDialogService, private equipmentService:EquipmentService) { }

  ngOnInit() {
    this.getAllEquipments();
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  getAllEquipments():any{
    this.equipmentService.getEquipments()
      .subscribe(equipment =>{
        this.equipment = equipment;
        this.dataSource = new MatTableDataSource(equipment);
        this.dataSource.filterPredicate = (data, filter: string)  => {
            const accumulator = (currentTerm, key) => {
            return key === 'equipmentType' ? currentTerm + data.equipmentType.equipmentType : currentTerm + data[key];
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase(); //converts to lowercase before comparing
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'equipmentType.equipmentType': return item.equipmentType.equipmentType;
              default: return item[property];
            }
         
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    },
    error => this.errorMessage = <any>error)
  }

  deleteEquipmentDetails(equipmentId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this equipment details?")
    .then((confirmed) =>{ 
       if(!confirmed) return;
       this.equipmentService.deleteEquipment(equipmentId)
          .subscribe((data)=> {
             this.getAllEquipments();
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].equipmentID;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Equipment_Details",this.ShowLabel);   
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
          data = data.equipmentType;
        }
        row += '"' + data + '",';
      }
      row.slice(0, row.length - 1);
      CSV += row + '\r\n';
    }
    if (CSV == '') {        
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
