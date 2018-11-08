import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Itps } from '../Itps';
import { environment } from '../../environments/environment';

@Injectable()
export class TpsService {

  constructor(private http: HttpClient) { }
  private baseUrl:string = environment.baseUrl;

  getTPS(): Observable<Itps[]> {
    return this.http.get(this.baseUrl+'/tps')
                .pipe(catchError(this.handleError));
  }
  getTPSById(id:number) : Observable<Itps[]>{
    return this.http.get(this.baseUrl+'/tps/'+id)
                .pipe(catchError(this.handleError));
  }
  addTPS(tps:Itps, capabilityId:Number): Observable<Itps[]> { 
    return this.http.post(this.baseUrl+'/tps/'+capabilityId,JSON.stringify(tps))
               .pipe(catchError(this.handleError));            
  }
  updateTPS(id:Number,tps:Itps):Observable<Itps[]>{
    return this.http.put(this.baseUrl+'/tps/'+id,JSON.stringify(tps))
               .pipe(catchError(this.handleError));
  }
  deleteTPS(tpsId:number){
    return this.http.delete(this.baseUrl+'/tps/'+tpsId)
               .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
