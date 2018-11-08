import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { LocationService } from './location.service';

@Injectable()
export class LocationGuard implements CanActivate {
  locationExist:boolean;

  constructor(private router: Router, private locationService: LocationService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.locationService.getLocation(+route.paramMap.get('id'))
    .subscribe(location => {
      this.locationExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.locationExist = false;
    });
    return this.locationExist;
  }
}
