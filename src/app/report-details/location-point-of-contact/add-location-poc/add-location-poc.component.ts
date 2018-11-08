import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ILocationPOC } from '../../../ILocationPOC';
import { LocationService } from '../../../services/location.service';
import { Router, ActivatedRoute}  from '@angular/router';
import { ILocation } from '../../../ILocation';
import { LocationPocService } from '../../../services/location-poc.service';


@Component({
  selector: 'app-add-location-poc',
  templateUrl: './add-location-poc.component.html',
  styleUrls: ['./add-location-poc.component.css']
})
export class AddLocationPocComponent implements OnInit {
  errorMessage:string;
  locationPOC : ILocationPOC[]=[];
  location: ILocation[]=[];
  name:string;
  selectedLocationID:number;
  locsel:string;
  id;
  disable:boolean = true;
  invalidLogin:boolean = false;
  contactNamePattern:string = "[a-zA-Z\\s]+";
  emailPattern :string ="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
  phoneNumberPattern: string = "[-()+ .]?(?:[0-9]+[-()+ .]+)+[0-9]+";
  minlengthName:number = 2;
  maxlengthName:number = 100;
  maxTitleValue:number = 50;

  contactForm  = new FormGroup({
    locationName   : new FormControl('',Validators.required),
    contactName    : new FormControl('',[Validators.required,Validators.pattern(this.contactNamePattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    email          : new FormControl('',[Validators.required,Validators.pattern(this.emailPattern),Validators.maxLength(this.maxlengthName)]),
    phone          : new FormControl('',[Validators.pattern(this.phoneNumberPattern),Validators.maxLength(30)]),
    title          : new FormControl('',[Validators.minLength(this.minlengthName),Validators.maxLength(this.maxTitleValue)])
  });

  constructor(private locationService:LocationService,private locationPOCService:LocationPocService, private router:Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.name = params['name'];
        this.locsel = this.name;
      })
      this.getInitialValues();
    }
    else{
      this.getLocationValues();
      this.disable = false;
    }   
  }

  getInitialValues():void{
    let contactId = parseInt(this.id);
    this.getLocationValues();
    this.locationPOCService.getContactId(contactId).take(1)
        .subscribe(locationPOC =>this.locationPOC=locationPOC,
        error => this.invalidLogin = true);
  }

  getLocationValues():void{
    this.locationService.getLocations()
        .subscribe(location => this.location = location,
         error => this.invalidLogin = true);
  }

  selectedLocation(event:any):void{
    this.selectedLocationID = event; 
  }

  processLocationPOC(locationPOC:ILocationPOC):void{
    if(this.id){
      this.locationPOCService.updateLocationPOC(this.id, locationPOC)
          .subscribe(locationPOC =>
            this.router.navigate(['/admin/locationPOC']),
        error => this.invalidLogin = true); 
    }
    else{
      this.locationPOCService.addLocationPOC(locationPOC,this.selectedLocationID)
          .subscribe(locationPOC =>
            this.router.navigate(['/admin/locationPOC']),
        error => this.invalidLogin = true);  
    }
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.contactForm.reset();
  }

  get locationName()
  {
    return this.contactForm.get('locationName');
  }
  get contactName()
  {
    return this.contactForm.get('contactName');
  }
  get email()
  {
    return this.contactForm.get('email');
  }
  get phone()
  {
    return this.contactForm.get('phone');
  }
  get title()
  {
    return this.contactForm.get('title');
  }
}