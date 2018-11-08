import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BomService } from './bom.service';

@Injectable()
export class BomGuard implements CanActivate {
  bomExist:boolean;

  constructor(private router: Router, private bomService: BomService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.bomService.getBOMById(+route.paramMap.get('id'))
    .subscribe(data => {
      this.bomExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.bomExist = false;
    });
    return this.bomExist;
  }
}