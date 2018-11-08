import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { ILocation } from '../ILocation';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class LocationService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getLocations(): Observable<ILocation[]> {
    return this.http.get(this.baseUrl+'/locations')
                .pipe(catchError(this.handleError));
  }
  addLocation(location : ILocation, id :number): Observable<ILocation[]> {
    return this.http.post(this.baseUrl+'/location/'+id,JSON.stringify(location))
               .pipe(catchError(this.handleError));
  }
  deleteLocation(id:Number){
    return this.http.delete(this.baseUrl+'/locations/'+id)
               .pipe(catchError(this.handleError));
  }
  getLocation(id:Number):Observable<ILocation[]>{
    return this.http.get(this.baseUrl+'/locations/'+id)
               .pipe(catchError(this.handleError));
  }
  updateLocation(id:Number,location:ILocation):Observable<ILocation[]>{
    return this.http.put(this.baseUrl+'/locations/'+id,JSON.stringify(location))
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
