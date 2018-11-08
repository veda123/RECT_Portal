import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICredentials } from '../ICredentails';
import { AuthService } from '../services/auth.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:string="Repair Equipment Configuration Tool";
  invalidLogin:boolean= false;
  imagePath:string = "../assets/images/thales.png";

  constructor(private _router:Router, private authService : AuthService, private route :ActivatedRoute) { }

  loginForm = new FormGroup({
    usernameOrEmail : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  login(credentials:ICredentials){
    this.authService.login(credentials)
        .subscribe((result) =>{
          if(result && result.accessToken){
            localStorage.setItem('token', result.accessToken);
            if(this.authService.getRole()) 
              this._router.navigate(['/admin']);
            else
              this._router.navigate(['/report']);
          }
          else{
            this.invalidLogin = true;
          }
      },
      error => this.invalidLogin = true);
  }

  get usernameOrEmail()
  {
    return this.loginForm.get('usernameOrEmail');
  }

  get password()
  {
    return this.loginForm.get('password');
  }
  
  ngOnInit() {
  }

}
