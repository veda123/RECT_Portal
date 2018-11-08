import { Component, OnInit,Input} from '@angular/core';

@Component({
  selector: 'addButton',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
  @Input() nextPageLink: string;

  constructor() { }

  ngOnInit() {
  }

}
