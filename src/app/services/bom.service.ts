import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { IBillOfMaterails } from '../IBillOfMaterials';
import { environment } from '../../environments/environment';

@Injectable()
export class BomService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http : HttpClient) { }

  getBOM():Observable<IBillOfMaterails[]>{
    return this.http.get(this.baseUrl+'/billOfMaterials')
               .pipe(catchError(this.handleError));             
  }

  getBOMById(id:Number):Observable<IBillOfMaterails[]>{
    return this.http.get(this.baseUrl+'/billOfMaterials/'+id)
               .pipe(catchError(this.handleError));
  }

  addBOM(billOfMaterials:IBillOfMaterails, id:Number, equipPartId:Number): Observable<IBillOfMaterails[]> {
    return this.http.post(this.baseUrl+'/billOfMaterials/'+id+'/'+equipPartId,JSON.stringify(billOfMaterials))
               .pipe(catchError(this.handleError));            
  }
  updateBOM(id:Number,billOfMaterials : IBillOfMaterails):Observable<IBillOfMaterails[]>{
    return this.http.put(this.baseUrl+'/billOfMaterials/'+id,JSON.stringify(billOfMaterials))
               .pipe(catchError(this.handleError));
  }
  deleteBOM(id:number){
    return this.http.delete(this.baseUrl+'/billOfMaterials/'+id)
               .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    return Observable.throw(error.statusText);
  }

}
