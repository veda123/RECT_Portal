import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { LocationService } from './location.service';

@Injectable()
export class LocationGuard implements CanActivate {
  constructor(private router: Router, private locationService: LocationService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.locationService.getLocation(+route.paramMap.get('id'))
    .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
