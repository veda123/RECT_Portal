import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Okta } from '../../shared/okta/okta.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string="RECT";
  user:string;
  loggedOut:string = "Log Out";
  oktaSignIn: any;

  constructor(private authService:AuthService,private _router:Router,private oktaAuth: OktaAuthService,private okta: Okta) {
    this.oktaSignIn = okta.getWidget();
   }

  ngOnInit() {
    //displays the user name based on their profile
    this.authService.getUser()
        .then(profile=>this.user=profile.user);
  }

  logOut():void{
    if(!this.authService.isLoggedIn()){  //checks whether the token is expired
      this._router.navigate(['/login']);
    }else{
      localStorage.removeItem('token'); //removes the token from localStorage
      this.oktaAuth.logout('/login'); 
    }
  }
}
