import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  //triggers this component when user sends the unkown url request
  title:string ="PAGE NOT FOUND";
  message:string = "SORRY!! REQUESTED PAGE NOT FOUND."
  constructor() { }

  ngOnInit() {
  }

}
