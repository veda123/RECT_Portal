import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { BomService } from './bom.service';

@Injectable()
export class BomGuard implements CanActivate {
  constructor(private router: Router, private bomService: BomService) { }
  
  canActivate(route:ActivatedRouteSnapshot):Observable<boolean>|boolean{
    return this.bomService.getBOMById(+route.paramMap.get('id'))
    .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }

  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}