import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { RepairToolsService } from './repair-tools.service';

@Injectable()
export class RepairKitGuard {
  constructor(private router: Router, private repairKitService: RepairToolsService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.repairKitService.getToolById(+route.paramMap.get('id'))
   .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
  
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
