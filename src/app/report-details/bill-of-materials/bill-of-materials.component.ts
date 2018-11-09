import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { IBillOfMaterails } from '../../IBillOfMaterials';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';
import { BomService } from '../../services/bom.service';

@Component({
  selector: 'app-bill-of-materials',
  templateUrl: './bill-of-materials.component.html',
  styleUrls: ['./bill-of-materials.component.css']
})
export class BillOfMaterialsComponent implements OnInit {
  displayedColumns = ['equipment.equipmentname','lrupartnumber','equipmentPart.equipmentPartNumber','manufacture','equipmentPart.description','quantity','action'];
  billOfMaterials:IBillOfMaterails[];
  dataSource;
  errorMessage:string;
  setfirst:boolean = false;
  ShowLabel:any[]=["TEST SET","LRU PARTNUMBER","MATERIAL PARTNUMBER","DESCRIPTION","MANUFACTURE","QUANTITY"];
  nextPageLinkValue:string='/admin/bill-of-materials/new';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private confirmationDialogService: ConfirmationDialogService, private BOMService:BomService ) { }

  ngOnInit() {
    this.getAllBillOfMaterials();
  }

  //gets all bill of materials details from the database once page loads
  getAllBillOfMaterials():any{
    this.BOMService.getBOM()
      .subscribe(BOM =>{
        this.billOfMaterials = BOM;
        this.dataSource = new MatTableDataSource(this.billOfMaterials);
        //filters the user entered input related data
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            if(key === 'equipment')
              return currentTerm + data.equipment.equipmentname;
            else if(key === 'equipmentPart'){
              if(data.equipmentPart.equipmentPartNumber.toLowerCase().includes(filter))
                return currentTerm + data.equipmentPart.equipmentPartNumber;
              else 
                return currentTerm + data.equipmentPart.description;
              }
            else
              return currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        //sorts the data based on user selection
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch(property) {
            case 'equipment.equipmentname': return item.equipment.equipmentname;
            case 'equipmentPart.equipmentPartNumber' : return item.equipmentPart.equipmentPartNumber;
            case 'equipmentPart.description' : return item.equipmentPart.description;
            default: return item[property];
          }         
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } ,
    error => this.errorMessage = <any>error);
  }

  deleteMaterial(materialId:number){
    this.confirmationDialogService.confirm('Delete confirmation', "Are you sure you want to delete this Material information?")
    .then((confirmed) =>{ 
       if(!confirmed)  return;
       this.BOMService.deleteBOM(materialId) //involes the delete service call and displays the updated info on the UI
          .subscribe((data) => this.getAllBillOfMaterials(),
          (error)=>{ this.errorMessage = <any>error;});   
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  displayFilter(value:any[]){
    this.dataSource.filter = value;
  }

  exportData():void {
    let clonedDataSource = JSON.parse(JSON.stringify(this.dataSource.filteredData));
    for (let element in clonedDataSource){
      delete clonedDataSource[element].billID;
    }
    this.JSONToCSVConvertor(clonedDataSource,"Bill-of-Materails_Details",this.ShowLabel);   //Convert JSON to CSV
  }
  
  JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
     //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    let arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    let CSV = '';    
     //This condition will generate the Header
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
          if(data.equipmentID != null && !this.setfirst){
            data = data.equipmentname;  
            this.setfirst = true;
          }
          if(data.equipmentID != null && this.setfirst){
            data = data.equipmentPartNumber +  '",' + '"' + data.description;
            this.setfirst = false;
          }         
        }
        row += '"' + data + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + '\r\n';
    }
    if (CSV == '') {        
      return;
    }   
  //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    var link = document.createElement("a");    
    link.href = uri;
    link.download = ReportTitle + ".csv";

  //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
