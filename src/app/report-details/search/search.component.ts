import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'searchTab',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() tableData: any[];
  @Output() searchValue : EventEmitter<string> = new EventEmitter<string>();
  dataSource;

  constructor() { }

  ngOnInit() {
  }

  applyFilter(filterValue:string){
    this.dataSource = new MatTableDataSource(this.tableData);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.searchValue.emit(this.dataSource.filter); 
  } 

}
