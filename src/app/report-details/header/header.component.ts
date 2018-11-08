import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title:string="RECT";
  user:string ="Admin";
  loggedOut:string = "Log Out";

  constructor(private authService:AuthService,private _router:Router) { }

  ngOnInit() {
  }

  logOut():void{
    this.authService.logOut();
    this._router.navigate(['/login']);

  }

}
