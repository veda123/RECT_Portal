import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IEquipmentType } from '../IEquipmentType';
import { environment } from '../../environments/environment';

@Injectable()
export class EquipmentTypeService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getEquipmentType(): Observable<IEquipmentType[]> {
    return this.http.get(this.baseUrl+'/equipmentType')
                .pipe(catchError(this.handleError));
  }

  getEquipmentById(id:Number):Observable<IEquipmentType[]>{
    return this.http.get(this.baseUrl+'/equipmentType/'+id)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
