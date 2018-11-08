import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AdminAuthGuard implements CanActivateChild{
  constructor( private authService: AuthService, private router: Router) { }

  canActivateChild():boolean{
    if(this.authService.getRole()) return true;
    this.router.navigate(['/AccessDenied']);
    return false;
  }
}
