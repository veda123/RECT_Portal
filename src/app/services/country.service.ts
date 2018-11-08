import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';
import { ICountry } from '../ICountry';
import { environment } from '../../environments/environment';

@Injectable()
export class CountryService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCountries(): Observable<ICountry[]> {
    return this.http.get(this.baseUrl+'/countries')
                .pipe(catchError(this.handleError));
  }
  getCountriesById(id:Number):Observable<ICountry[]>{
    return this.http.get(this.baseUrl+'/countries/'+id)
               .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
