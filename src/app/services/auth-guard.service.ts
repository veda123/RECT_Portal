import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor( private authService: AuthService, private router: Router) { }

  canActivateChild(route, state:RouterStateSnapshot):boolean{
    if(this.authService.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
