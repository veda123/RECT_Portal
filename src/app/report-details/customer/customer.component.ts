import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import * as XLSX from 'xlsx';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { ICustomer } from '../../ICustomer';
import { CustomerService } from '../../services/customer.service';
import { UploadFileService } from '../../services/upload-file.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  displayedColumns = ['customerName', 'inventory.equipment.equipmentname', 'inventory.serialNumber','contractStartDate','contractEndDate','contractType.contractType',
                      'dbFile.fileName','pointOfContact','action'];
  customer:ICustomer[];
  dataSource;
  errorMessage:string;
  ShowLabel:any[] = ["CUSTOMER","EQUIPMENT NAME","SERIAL NUMBER","CONTRACT START DATE","CONTRACT END DATE","CONTRACT TYPE","CONTRACT DETAILS","POINT OF CONTACT"];
  nextPageLinkValue:string='/admin/contract/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private customerService:CustomerService, private confirmationDialogService:ConfirmationDialogService, private uploadService:UploadFileService, ) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  deleteCustomer(customerId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this Customer information?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.customerService.deleteCustomer(customerId)
          .subscribe((data)=> {
            this.getAllCustomers();
          },
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  downloadFile(fileId:string,fileName:string){
    this.uploadService.downloadFile(fileId)
        .subscribe(file => {
          let blob = new Blob([file], {type: 'application/octet-stream'});
          FileSaver.saveAs(blob,fileName)},
        error => this.errorMessage = <any>error);
  }

  getAllCustomers():any{
    this.customerService.getCustomers()
      .subscribe(customer =>{
        this.customer = customer;
        this.dataSource = new MatTableDataSource(customer);
        this.dataSource.filterPredicate = (data, filter: string)  => {
            const accumulator = (currentTerm, key) => {
              if(key === 'inventory'){
                if(data.inventory.serialNumber.toLowerCase().includes(filter))
                  return currentTerm + data.inventory.serialNumber;
                else 
                  return currentTerm + data.inventory.equipment.equipmentname;
                }
              else if(key === 'contractType'){
                return currentTerm + data.contractType.contractType;
              }
              else if(key === 'dbFile'){
                return currentTerm + data.dbFile.fileName;
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
              case 'inventory.equipment.equipmentname': return item.inventory.equipment.equipmentname;
              case 'inventory.serialNumber': return item.inventory.serialNumber;
              case 'contractType.contractType': return item.contractType.contractType;
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
      delete clonedDataSource[element].customerId;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Contract_Details",this.ShowLabel);   
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
            data = value +  '",' + '"' + data.serialNumber;
          }
          if(data.contractTypeId != null)
            data = data.contractType;  
          if(data.id != null)
            data = data.fileName;
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
