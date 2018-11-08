import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { RequestOptions } from '@angular/http';
import { IUploadFile } from '../IUploadFile';
import { environment } from '../../environments/environment';

@Injectable()
export class UploadFileService {

  private baseUrl:string = environment.baseUrl;
  private headers = new HttpHeaders({
    'Content-Type': " ",
    'Cache-Control':'no-cache'
    });

  constructor(private http: HttpClient) { }

  uploadFile(formData:FormData) : Observable<IUploadFile[]> {
    return this.http.post(this.baseUrl+'/uploadFile/',formData,{ headers: this.headers})
               .pipe(catchError(this.handleError));            
  }
  downloadFile(fileId:String){
   return this.http.get(this.baseUrl+'/downloadFile/'+fileId, { headers: this.headers ,responseType: 'blob'})
                .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return Observable.throw(error.statusText);
  }
}
