import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { IContractType } from '../IContractType';
import { environment } from '../../environments/environment';

@Injectable()
export class ContractTypeService {
  private baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getContractType(): Observable<IContractType[]> {
    return this.http.get(this.baseUrl+'/contractType')
                .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
