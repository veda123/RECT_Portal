import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RepairToolsService } from './repair-tools.service';

@Injectable()
export class RepairKitGuard {
  repairKitExist:boolean;

  constructor(private router: Router, private repairKitService: RepairToolsService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.repairKitService.getToolById(+route.paramMap.get('id'))
    .subscribe(data => {
      this.repairKitExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.repairKitExist = false;
    });
    return this.repairKitExist;
  }
}
