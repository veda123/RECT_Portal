import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocationService } from './location.service';
import { LocationCapabilityService } from './location-capability.service';

@Injectable()
export class LocationCapGuard {
  locationCapExist:boolean;

  constructor(private router: Router, private locationCapService: LocationCapabilityService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.locationCapService.getLocationCapabilityById(+route.paramMap.get('id'))
    .subscribe(locationCap => {
      this.locationCapExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.locationCapExist = false;
    });
    return this.locationCapExist;
  }
}
