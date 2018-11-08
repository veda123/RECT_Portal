import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IEquipInventory } from '../IEquipInventory';
import { environment } from '../../environments/environment';

@Injectable()
export class InventoryService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getInventory(): Observable<IEquipInventory[]> {
    return this.http.get(this.baseUrl+'/inventory')
                .pipe(catchError(this.handleError));
  }
  getInventoryById(id:number) : Observable<IEquipInventory[]>{
    return this.http.get(this.baseUrl+'/inventory/'+id)
                .pipe(catchError(this.handleError));
  }
  addInventory(inventory:IEquipInventory, equipmentId:Number, locationId:Number): Observable<IEquipInventory[]> {
    return this.http.post(this.baseUrl+'/inventory/'+equipmentId+'/'+locationId,JSON.stringify(inventory))
               .pipe(catchError(this.handleError));            
  }
  updateInventory(id:Number,inventory:IEquipInventory):Observable<IEquipInventory[]>{
    return this.http.put(this.baseUrl+'/inventory/'+id,JSON.stringify(inventory))
               .pipe(catchError(this.handleError));
  }
  deleteInventory(inventoryId:number){
    return this.http.delete(this.baseUrl+'/inventory/'+inventoryId)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
