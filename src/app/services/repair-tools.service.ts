import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IRepairTools } from '../IRepairTools';
import { environment } from '../../environments/environment';

@Injectable()
export class RepairToolsService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTools(): Observable<IRepairTools[]> {
    return this.http.get(this.baseUrl+'/repairTools')
                .pipe(catchError(this.handleError));
  }
  getToolById(id:number) : Observable<IRepairTools[]>{
    return this.http.get(this.baseUrl+'/repairTools/'+id)
                .pipe(catchError(this.handleError));
  }
  addRepairTool(repairTool:IRepairTools, equipmentId:Number, capabilityId:Number): Observable<IRepairTools[]> {
    return this.http.post(this.baseUrl+'/repairTools/'+equipmentId+'/'+capabilityId,JSON.stringify(repairTool))
               .pipe(catchError(this.handleError));            
  }
  addRepairQuantity(repairTool:IRepairTools, capabilityId:Number): Observable<IRepairTools[]> {
    return this.http.post(this.baseUrl+'/repairTools/'+capabilityId,JSON.stringify(repairTool))
               .pipe(catchError(this.handleError));            
  }

  updateRepairTool(toolId:Number,equipmentId:Number,repairTool:IRepairTools):Observable<IRepairTools[]>{
    return this.http.put(this.baseUrl+'/repairTools/'+toolId+'/'+equipmentId,JSON.stringify(repairTool))
               .pipe(catchError(this.handleError));
  }

  updateRepairToolByQuantity(toolId:Number,repairTool:IRepairTools):Observable<IRepairTools[]>{
    return this.http.put(this.baseUrl+'/repairTools/'+toolId,JSON.stringify(repairTool))
               .pipe(catchError(this.handleError));
  }
  deleteRepairTool(toolId:number){
    return this.http.delete(this.baseUrl+'/repairTools/'+toolId)
               .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
