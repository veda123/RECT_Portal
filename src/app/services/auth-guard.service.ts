import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor( private authService: AuthService, private router: Router) { }

  //This guard will make sure only logged in user will be able to access the application
  //If not, it redirects to login page
  canActivateChild(route, state:RouterStateSnapshot){
    if(this.authService.isLoggedIn()) return true;
      this.router.navigate(['/login']);
      return false;
  }
}
