import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICredentials } from '../ICredentails';
import { AuthService } from '../services/auth.service';
import { Token } from '@angular/compiler';
import { Okta } from '../shared/okta/okta.service';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:string="Repair Equipment Configuration Tool";
  invalidLogin:boolean= false;
  imagePath:string = "../assets/images/thales.png";
  user:string;
  oktaSignIn;
  groups: any;
  isAuthenticated: boolean;
  isTokenExpired:boolean = false;
  
  constructor(private okta: Okta, private changeDetectorRef: ChangeDetectorRef,private oktaAuth: OktaAuthService, private authService: AuthService) {
    this.oktaSignIn = okta.getWidget();
  }

  //Okta widget is used to customise the login page
  showLogin() { 
    this.oktaSignIn.renderEl({el: '#okta-login-container'}, (response) => {
      if (response.status === 'SUCCESS') {
        this.user = response.claims.email;
        this.oktaSignIn.remove();
        this.oktaAuth.loginRedirect("/redirect");
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated(); //check for user authentication
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );

    //check whether user is already logged in or not 
    //If already logged in then based on their role navigate to the right route 
    //If not logged in then display the login page which ask them for login information
    if(!this.authService.isLoggedIn())
    {
      this.isTokenExpired = true;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      this.showLogin();
    }
    else{
      this.oktaSignIn.session.get((response) => {
        if (response.status !== 'INACTIVE') {
          this.user = response.login;
          this.oktaAuth.loginRedirect("/redirect"); // reddirect based on their role
          this.changeDetectorRef.detectChanges();
        } else {
          this.showLogin();
        }
      });
    }
  }
}


