import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { IEquipInventory } from '../../IEquipInventory';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  displayedColumns = ['equipment.equipmentname', 'equipment.equipmentPartNumber', 'serialNumber','rev','manufactureDate','status','owner','ownership','location.locationName','action'];
  inventory:IEquipInventory[];
  dataSource;
  errorMessage:string;
  ShowLabel:any[]=["EQUIPMENT","PARTNUMBER","SERIAL NUMBER","REV","MANUFACTURE DATE","STATUS","OWNER","OWNERSHIP","LOCATION"];
  nextPageLinkValue:string='/admin/inventory/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private inventoryService:InventoryService,private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getAllInventory();
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  deleteInventory(inventoryId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this Inventory information?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.inventoryService.deleteInventory(inventoryId)
          .subscribe((data)=> {
            this.getAllInventory();
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  getAllInventory():any{
    this.inventoryService.getInventory()
      .subscribe(inventory =>{
        this.inventory = inventory;
        this.dataSource = new MatTableDataSource(inventory);
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if(key === 'equipment'){
              let value = data.equipment.equipmentname.toLowerCase();
              if (value.includes(filter))
                return currentTerm + data.equipment.equipmentname;
              else 
                return currentTerm + data.equipment.equipmentPartNumber;
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
            case 'equipment.equipmentname': return item.equipment.equipmentname;
            case 'location.locationName': return item.location.locationName;
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
      delete clonedDataSource[element].inventoryId;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Inventory_Details",this.ShowLabel);   
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
          if(data.equipmentID != null)
          {
            let value = data.equipmentname;
            data = value +  '",' + '"' + data.equipmentPartNumber;
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
