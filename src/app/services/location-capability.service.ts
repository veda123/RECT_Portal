import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { ILocationCapability } from '../ILocationCapability';
import { environment } from '../../environments/environment';

@Injectable()
export class LocationCapabilityService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLocationCapability(): Observable<ILocationCapability[]> {
    return this.http.get(this.baseUrl+'/locationCapability')
                .pipe(catchError(this.handleError));
  }
  getLocationCapabilityById(id:number) : Observable<ILocationCapability[]>{
    return this.http.get(this.baseUrl+'/locationCapability/'+id)
                .pipe(catchError(this.handleError));
  }
  addLocationCapability(locationCapability:ILocationCapability, repairId:Number, locationId:Number): Observable<ILocationCapability[]> {
    return this.http.post(this.baseUrl+'/locationCapability/'+repairId+'/'+locationId,JSON.stringify(locationCapability))
               .pipe(catchError(this.handleError));            
  }
  updateLocationCapability(id:Number,locationCapability:ILocationCapability):Observable<ILocationCapability[]>{
    return this.http.put(this.baseUrl+'/locationCapability/'+id,JSON.stringify(locationCapability))
               .pipe(catchError(this.handleError));
  }
  deleteLocationCapability(locationCapabilityId:number){
    return this.http.delete(this.baseUrl+'/locationCapability/'+locationCapabilityId)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}

