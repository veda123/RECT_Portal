import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { EquipmentService } from './equipment.service';

@Injectable()
export class EquipmentGuard {
  constructor(private router: Router, private equipmentService: EquipmentService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.equipmentService.getEquipmentById(+route.paramMap.get('id'))
    .map(data => {
       return data ? true : this.router.navigate(['/PageNotFound']);
      // if (!data) 
      // {
      //   this.router.navigate(['/PageNotFound']);
      //   return false;
      // } 
      // else 
      //   return true;
    })
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
