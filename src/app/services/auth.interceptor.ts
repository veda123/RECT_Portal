import { Router } from '@angular/router';
import {  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { OktaAuthService } from "@okta/okta-angular";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor{
    constructor(private oktaAuth: OktaAuthService, private authService :AuthService, private _router:Router ) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return Observable.fromPromise(this.handleAccess(request, next));
    }
  
    private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
        const accessToken = await this.oktaAuth.getAccessToken();
        if(accessToken){
            if(!this.authService.isLoggedIn()){
                this._router.navigate(['/login']);
            }
            //sets the header for uploading and downloading file service calls as they dont accept the content-type
            if(request.headers.has('Content-Type') && request.headers.has('Cache-Control')){
                let headers = request.headers
                    .delete('Content-Type')
                    .set('Authorization','Bearer ' + accessToken);
                request = request.clone({ headers}); 

            }
            //header for rest of the http calls
            else{
                let headers = request.headers
                    .set('Content-Type', 'application/json')
                    .set('Authorization','Bearer ' + accessToken);
                request = request.clone({ headers});
                    
            }
        }
      return next.handle(request).toPromise();
    } 
}
