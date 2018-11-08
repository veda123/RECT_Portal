import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { LocationPocService } from './location-poc.service';

@Injectable()
export class LocationPocGuard implements CanActivate{
  locationPOCExist:boolean;

  constructor(private router: Router, private locationPOCService: LocationPocService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.locationPOCService.getContactId(+route.paramMap.get('id'))
    .subscribe(locationPOC => {
      this.locationPOCExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.locationPOCExist = false;
    });
    return this.locationPOCExist;
  }
}
