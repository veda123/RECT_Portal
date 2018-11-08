import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DateInitService {
  defaultDate:string;
  stringCurrDate:string;
  stringCurrMonth:string;

  constructor() { }

  public Initaialise():any{
    let date = new Date();
    let currDate = date.getDate();
    this.stringCurrDate = currDate.toString();
    if(currDate < 10){
      this.stringCurrDate = "0" + currDate;
    }
    let currMonth = date.getMonth() + 1;
    this.stringCurrMonth = currMonth.toString();
    if(currMonth < 10){
      this.stringCurrMonth = "0" + currMonth;
    }
    let currYear = date.getFullYear();
   return this.defaultDate = currYear + "-" + this.stringCurrMonth + "-" + this.stringCurrDate;
  }
}
