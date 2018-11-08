import { Directive , OnInit,  HostListener} from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[Goback]'
})
export class GobackDirective {

  constructor(private location: Location) { } 
  
  @HostListener('click') onClick() {
    this.location.back();
  } 
}

