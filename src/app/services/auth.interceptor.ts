import {  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor  implements HttpInterceptor{
    constructor(private authService :AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = this.authService.getToken();
        if (token) {
            if(request.headers.has('Content-Type') && request.headers.has('Cache-Control')){
                let headers = request.headers
                .delete('Content-Type')
                .set('Authorization','Bearer ' + token);
                request = request.clone({ headers}); 
            }
            else{   
                let headers = request.headers
                .set('Content-Type', 'application/json')
                .set('Authorization','Bearer ' + token);
                request = request.clone({ headers});
            }
        }
        return next.handle(request);
        }   
    }
