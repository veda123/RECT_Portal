import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { ICustomer } from '../ICustomer';
import { environment } from '../../environments/environment';


@Injectable()
export class CustomerService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get(this.baseUrl+'/customers')
                .pipe(catchError(this.handleError));
  }
  getCustomerById(id:number) : Observable<ICustomer[]>{
    return this.http.get(this.baseUrl+'/customers/'+id)
                .pipe(catchError(this.handleError));
  }
  addCustomer(customer:ICustomer, equipmentId:Number, contractTypeId:Number, fileId:String): Observable<ICustomer[]> {
    return this.http.post(this.baseUrl+'/customer/'+equipmentId+'/'+contractTypeId+'/'+fileId,JSON.stringify(customer))
               .pipe(catchError(this.handleError));            
  }
  updateCustomer(id:Number,customer:ICustomer):Observable<ICustomer[]>{
    return this.http.put(this.baseUrl+'/customer/'+id,JSON.stringify(customer))
               .pipe(catchError(this.handleError));
  }
  deleteCustomer(customerId:number){
    return this.http.delete(this.baseUrl+'/customer/'+customerId)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
