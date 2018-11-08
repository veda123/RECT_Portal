import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { TpsService } from './tps.service';

@Injectable()
export class TpsGuard {
  tpsExist:boolean;

  constructor(private router: Router, private tpsService: TpsService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.tpsService.getTPSById(+route.paramMap.get('id'))
    .subscribe(data => {
      this.tpsExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.tpsExist = false;
    });
    return this.tpsExist;
  }
}
