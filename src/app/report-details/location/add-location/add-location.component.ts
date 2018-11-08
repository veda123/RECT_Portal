import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import{Router, ActivatedRoute}  from '@angular/router';
import { ILocation } from '../../../ILocation';
import 'rxjs/add/operator/take';
import { CountryService } from '../../../services/country.service';
import { ICountry } from '../../../ICountry';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
  errorMessage: string;
  id;
  location:ILocation[] = [];
  countries:ICountry[] = [];
  phoneNumberPattern: string = "[-()+ .]?(?:[0-9]+[-()+ .]+)+[0-9]+";
  locNamePattern:string = "[a-zA-Z\\s]+";
  timeZonePattern:string = "[+/-]?[0-9]{1,2}[.]?[0-9]{0,2}";
  countrySel:string;
  citySel : string;
  countryId:string;
  cityName : string;
  selectedCountryId:number;
  disable:boolean = true;
  invalidLogin:boolean = false;
  minlengthName:number = 2;
  maxlengthName:number = 50;
  maxTimeZoneValue:number = 14;
  minTimeZoneValue :number = -12;
  maxAddressValue:number = 1000;
  minZipcodeValue:number=5;
  maxZipcodeValue:number=10;
  
  constructor(private locationService:LocationService,private router:Router, private route: ActivatedRoute , private countryService:CountryService) {  }

  locationForm  = new FormGroup({
    locationName   : new FormControl('',[Validators.required,Validators.pattern(this.locNamePattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    address        : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(1000)]),
    city           : new FormControl('',[Validators.required,Validators.pattern(this.locNamePattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    countryName    : new FormControl('',Validators.required),
    zipcode        : new FormControl('',[Validators.required,Validators.minLength(this.minZipcodeValue),Validators.maxLength(this.maxZipcodeValue)]),
    phone          : new FormControl('',[Validators.pattern(this.phoneNumberPattern),Validators.maxLength(30)]),
    timezone       : new FormControl('',[Validators.required,Validators.pattern(this.timeZonePattern),Validators.max(this.maxTimeZoneValue),Validators.min(this.minTimeZoneValue)])
  })

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.countryId = params['countryName'];
        this.countrySel = this.countryId;
      })
      this.getInitialValues();
    }
    else{
        this.getCountries(); 
        this.disable = false;
      }       
  }

  getInitialValues():void{
    let locationId = parseInt(this.id);
    this.getCountries();
    this.locationService.getLocation(locationId).take(1)
      .subscribe(location => this.location = location,
      error => this.invalidLogin = true);   
    }

  getCountries():void{
    this.countryService.getCountries()
    .subscribe(countries =>this.countries = countries,
    error=>this.errorMessage = <any>error);
  }

  processLocation(location:ILocation):void{
    if(this.id){
      this.locationService.updateLocation(this.id, location)
      .subscribe(location =>
        this.router.navigate(['/admin/location']),
      error => this.invalidLogin = true); 
    }
    else{
      this.locationService.addLocation(location,this.selectedCountryId)
        .subscribe(location =>
          this.router.navigate(['/admin/location']),
          error => this.invalidLogin = true); 
      }
    }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.locationForm.reset();
  }

  selectedCountry(event:any)
  {
    this.selectedCountryId = event; 
  }

  get locationName()
  {
    return this.locationForm.get('locationName');
  }

  get address()
  {
    return this.locationForm.get('address');
  }

  get city()
  {
    return this.locationForm.get('city');
  }
  get countryName()
  {
    return this.locationForm.get('countryName');
  }
  get zipcode()
  {
    return this.locationForm.get('zipcode');
  }
  get phone()
  {
    return this.locationForm.get('phone');
  }
  get timezone()
  {
    return this.locationForm.get('timezone');
  }
}
