import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { InventoryService } from './inventory.service';

@Injectable()
export class InventoryGuard {
  inventoryExist:boolean;

  constructor(private router: Router, private inventoryService: InventoryService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.inventoryService.getInventoryById(+route.paramMap.get('id'))
    .subscribe(data => {
      this.inventoryExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.inventoryExist = false;
    });
    return this.inventoryExist;
  }
}

