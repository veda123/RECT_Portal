import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CustomerService } from './customer.service';

@Injectable()
export class CustomerGuard {
  customerExist:boolean;

  constructor(private router: Router, private customerService :CustomerService) { }
  
  canActivate(route:ActivatedRouteSnapshot):boolean{
    this.customerService.getCustomerById(+route.paramMap.get('id'))
    .subscribe(customer => {
      this.customerExist = true;
    },
    error => {
      this.router.navigate(['/PageNotFound']);
      this.customerExist = false;
    });
    return this.customerExist;
  }
}
