import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { ILocationPOC } from '../ILocationPOC';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationPocService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getLocationPOC():Observable<ILocationPOC[]>{
    return this.http.get(this.baseUrl+'/locationsPOC')
               .pipe(catchError(this.handleError));             
  }
  getContactId(id:Number):Observable<ILocationPOC[]>{
    return this.http.get(this.baseUrl+'/locationPOC/'+id)
               .pipe(catchError(this.handleError));
  }
  addLocationPOC(locationPOC : ILocationPOC, id:Number): Observable<ILocationPOC[]> {
    return this.http.post(this.baseUrl+'/locations/'+id+'/locationPOC',JSON.stringify(locationPOC))
               .pipe(catchError(this.handleError));            
  }
  updateLocationPOC(id:Number,locationPOC:ILocationPOC):Observable<ILocationPOC[]>{
    return this.http.put(this.baseUrl+'/locationsPOC/'+id,JSON.stringify(locationPOC))
               .pipe(catchError(this.handleError));
  }
  deleteLocationPOC(contactId:number){
    return this.http.delete(this.baseUrl+'/locationsPOC/'+contactId)
               .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    return Observable.throw(error.statusText);
  }

}
