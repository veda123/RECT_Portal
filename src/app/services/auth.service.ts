import { async } from '@angular/core/testing';
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
import { OktaAuthService } from '@okta/okta-angular';

@Injectable()
export class AuthService {
  group: any;
  private baseUrl:string = environment.baseUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient , private oktaAuth:OktaAuthService) { }

   getAdmin(){
    let token = localStorage.getItem('token');
    let value = new JwtHelper().decodeToken(token);
    if(value.groups.includes("Test-Set-Engineering")) return true; //checks whether the user is admin or not
    return false;
  }

  async getUser(){
    const accessToken = await this.oktaAuth.getAccessToken();
    localStorage.setItem("token",accessToken);
    return new JwtHelper().decodeToken(accessToken);
  }

  isLoggedIn():boolean{
    return tokenNotExpired(); // returns true if token is expired or vice versa
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }
}
  


