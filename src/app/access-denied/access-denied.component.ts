import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent implements OnInit {
  //Displays access denied message for non-admin users
  title:string ="YOU DON'T HAVE ACCESS TO THIS PAGE";
  message:string = "Contact the admin to request access to this page."

  constructor() { }

  ngOnInit() {
  }

}
