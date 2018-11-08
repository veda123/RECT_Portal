import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ICredentials } from '../ICredentails';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IAuthToken } from '../IAuthToken';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { IUser } from '../IUser';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private baseUrl:string = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  login(credentials : ICredentials):Observable<IAuthToken> {
    return this.http.post(this.baseUrl+'/auth/signin',JSON.stringify(credentials),this.httpOptions)
               .pipe(catchError(this.handleError));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  currentUser(id:number):Observable<IUser>{
    return this.http.get(this.baseUrl+'/users/'+id)
        .pipe(catchError(this.handleError));
  }

  userName(value):Observable<IUser>{
      return this.http.get(this.baseUrl+'/users/',{ params: {name: value}})
                 .pipe(catchError(this.handleError));   
  }
  
  getRole():boolean{
    let token = localStorage.getItem('token');
    let value = new JwtHelper().decodeToken(token);
    if(value.roles[0] === "ROLE_ADMIN") return true;
    return false;
  }

  isLoggedIn():boolean{
    return tokenNotExpired();
  }
  
  logOut():void{
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }

}
