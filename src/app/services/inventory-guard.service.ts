import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { InventoryService } from './inventory.service';

@Injectable()
export class InventoryGuard {
  constructor(private router: Router, private inventoryService: InventoryService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.inventoryService.getInventoryById(+route.paramMap.get('id'))
    .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}

