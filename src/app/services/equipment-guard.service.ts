import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { EquipmentService } from './equipment.service';

@Injectable()
export class EquipmentGuard {
  equipmentExist:boolean;

  constructor(private router: Router, private equipmentService: EquipmentService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.equipmentService.getEquipmentById(+route.paramMap.get('id'))
    .subscribe(data => {
      this.equipmentExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.equipmentExist = false;
    });
    return this.equipmentExist;
  }
}
