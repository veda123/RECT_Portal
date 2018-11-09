import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocationPocService } from './location-poc.service';

@Injectable()
export class LocationPocGuard implements CanActivate{
  constructor(private router: Router, private locationPOCService: LocationPocService) { }

  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.locationPOCService.getContactId(+route.paramMap.get('id'))
   .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
