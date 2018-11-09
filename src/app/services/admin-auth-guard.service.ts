import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AdminAuthGuard implements CanActivateChild{

  constructor( private authService: AuthService, private router: Router) { }

  //protect the admin related routes
  canActivateChild():boolean{
    if(this.authService.getAdmin()) return true;
    this.router.navigate(['/AccessDenied']);
    return false;
  }
}
