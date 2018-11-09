import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.css']
})
export class LoginRedirectComponent implements OnInit {
  group;

  constructor(private authService:AuthService , private _router:Router, private route:ActivatedRoute) { }

  async ngOnInit() {
    this.authService.getUser()
    .then(profile=>{ 
      this.group=profile.groups;
      let validGroup = this.group.includes("Test-Set-Engineering");
      if(validGroup)
        this._router.navigate(['/admin']); //navigate to the admin page if the user is a part of the TSE group
      else  
        this._router.navigate(['/report']); // naviage to the report page for the non-admin user
    });
  }
}
