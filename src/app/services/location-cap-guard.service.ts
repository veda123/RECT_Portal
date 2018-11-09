import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocationService } from './location.service';
import { LocationCapabilityService } from './location-capability.service';

@Injectable()
export class LocationCapGuard {
  constructor(private router: Router, private locationCapService: LocationCapabilityService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.locationCapService.getLocationCapabilityById(+route.paramMap.get('id'))
    .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
