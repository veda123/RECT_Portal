import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  today = new Date();
  dd = this.today.getDate();
  mm = this.today.getMonth()+1;
  yyyy = this.today.getFullYear();
  minDate = {year: this.yyyy,month: this.mm,day: this.dd};
  model:any;
  imagePath:string = "../assets/images/calendar.png";
  datePattern:string ="\d{4}-\d{2}-\d{2}";
  // datePattern ="[a-zA-Z\\s]+";
  @Input() value :string;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  dateForm  = new FormGroup({
    dateField   : new FormControl('',[Validators.required,Validators.pattern(this.datePattern)])
  })

  constructor() { }

  ngOnInit() { } 

  onDateChange(dt:any) {
    if(dt.month < 10){
      dt.month= '0'+dt.month;
    }
    if(dt.day < 10){
      dt.day = '0'+dt.day;
    }
    this.notify.emit(dt.year+'-'+dt.month+'-'+dt.day);
  }

  get dateField()
  {
    return this.dateForm.get('dateField');
  }

}
