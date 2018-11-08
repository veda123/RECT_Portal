import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IRepairCapability } from '../IRepairCapability';
import { environment } from '../../environments/environment';

@Injectable()
export class RepairCapabilityService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCapability(): Observable<IRepairCapability[]> {
    return this.http.get(this.baseUrl+'/repairCapability')
                .pipe(catchError(this.handleError));
  }
  getCapabilityById(id:number) : Observable<IRepairCapability[]>{
    return this.http.get(this.baseUrl+'/repairCapability/'+id)
                .pipe(catchError(this.handleError));
  }
  addRepairCapability(repairCapability:IRepairCapability, equipmentId:Number): Observable<IRepairCapability[]> {
    return this.http.post(this.baseUrl+'/repairCapability/'+equipmentId,JSON.stringify(repairCapability))
               .pipe(catchError(this.handleError));            
  }
  updateRepairCapability(id:Number,repairCapability:IRepairCapability):Observable<IRepairCapability[]>{
    return this.http.put(this.baseUrl+'/repairCapability/'+id,JSON.stringify(repairCapability))
               .pipe(catchError(this.handleError));
  }
  deleteRepairCapability(id:Number){
    return this.http.delete(this.baseUrl+'/repairCapability/'+id)
               .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
