import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from './customer.service';
import { error } from 'util';

@Injectable()
export class CustomerGuard {
  constructor(private router: Router, private customerService :CustomerService) { }

  canActivate(route:ActivatedRouteSnapshot): Observable<boolean>|boolean {
    return this.customerService.getCustomerById(+route.paramMap.get('id'))
    .map(data => { return data ? true : false;})
    .catch((error: any) => Observable.throw(this.errorHandler(error)));  
  }
    
  private errorHandler(error: any): void {
    this.router.navigate(['/PageNotFound']);
  }
}
