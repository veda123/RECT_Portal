import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IEquipment } from '../IEquipment';
import { environment } from '../../environments/environment';

@Injectable()
export class EquipmentService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getEquipments(): Observable<IEquipment[]> {
    return this.http.get(this.baseUrl+'/equipments')
                .pipe(catchError(this.handleError));
  }

  getEquipmentById(id:number) : Observable<IEquipment[]>{
    return this.http.get(this.baseUrl+'/equipments/'+id)
                .pipe(catchError(this.handleError));
  }

  addEquipment(equipment : IEquipment, id:Number): Observable<IEquipment[]> {
    return this.http.post(this.baseUrl+'/equipment/'+id,JSON.stringify(equipment))
               .pipe(catchError(this.handleError));            
  }
  updateEquipment(id:Number,equipment:IEquipment):Observable<IEquipment[]>{
    return this.http.put(this.baseUrl+'/equipment/'+id,JSON.stringify(equipment))
               .pipe(catchError(this.handleError));
  }

  deleteEquipment(equipmentId:number){
    return this.http.delete(this.baseUrl+'/equipment/'+equipmentId)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
