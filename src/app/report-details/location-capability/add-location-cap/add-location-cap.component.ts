import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { DateInitService } from '../../../services/date-init.service';
import { ILocation } from '../../../ILocation';
import { IRepairCapability } from '../../../IRepairCapability';
import { LocationService } from '../../../services/location.service';
import { RepairCapabilityService } from '../../../services/repair-capability.service';
import { ILocationCapability } from '../../../ILocationCapability';
import { LocationCapabilityService } from '../../../services/location-capability.service';

@Component({
  selector: 'app-add-location-cap',
  templateUrl: './add-location-cap.component.html',
  styleUrls: ['./add-location-cap.component.css']
})
export class AddLocationCapComponent implements OnInit {
  location:ILocation[]=[];
  repairCapability:IRepairCapability[]=[];
  locationCap:ILocationCapability[]=[];
  errorMessage:string;
  selectedEquipId:number;
  selectedLocationId:number;
  locSel:string;
  typeSel:string;
  repairId:string;
  locId:string;
  id;
  defaultDate:string;
  disable:boolean = true;
  dateSelected:boolean = false;
  invalidLogin:boolean = false;

  locationCapabilityForm  = new FormGroup({
    testSetName           : new FormControl('',Validators.required),
    lrupartnumber         : new FormControl('',Validators.required),
    lrudescription        : new FormControl('',Validators.required),
    locationName          : new FormControl('',Validators.required),
    establishedDate       : new FormControl('')
  });

  constructor(private dateService:DateInitService,private router:Router, private route: ActivatedRoute, private repairCapService:RepairCapabilityService, 
              private locationService:LocationService, private locationCapService:LocationCapabilityService){ }
              
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.repairId = params['repairId'];
        this.locId = params['locationId']
        this.typeSel = this.repairId;
        this.locSel = this.locId;
      })
      this.getInitialValues();
    }
    else{
      this.getDropDownValues();
      this.disable = false;
      this.defaultDate = this.dateService.Initaialise();
    }
  }

  getInitialValues():void{
    let locationCapId = parseInt(this.id);
    this.getDropDownValues();
    this.locationCapService.getLocationCapabilityById(locationCapId).take(1)
        .subscribe(locationCap =>{
          this.locationCap=locationCap
        this.defaultDate = this.locationCap['establishedDate'];
        this.defaultDate = this.defaultDate.slice(0, 10);
      },
    error => this.invalidLogin = true);
  }

  getDropDownValues():any{
    this.repairCapService.getCapability()
        .subscribe(repairCapability => this.repairCapability = repairCapability,
          error => this.invalidLogin = true);
    this.locationService.getLocations()
        .subscribe(location => this.location = location,
          error => this.invalidLogin = true); 
  }

  onNotify(date){
    this.dateSelected = true;
    this.locationCapabilityForm.get('establishedDate').setValue(date);
  }

  processLocationCap(locationCap:ILocationCapability){
    if (!this.dateSelected){
      locationCap['establishedDate'] = this.defaultDate;
    }
    if(this.id){
      this.locationCapService.updateLocationCapability(this.id,locationCap)
          .subscribe(inventory =>this.router.navigate(['/admin/repairCapability']),
          error => this.invalidLogin = true);  
    }
    else{
      this.locationCapService.addLocationCapability(locationCap,this.selectedEquipId,this.selectedLocationId)
        .subscribe(locationCap =>this.router.navigate(['/admin/repairCapability']),
        error => this.invalidLogin = true);  
    }    
  }

  selectedEquipName(event:any)
  {
    this.selectedEquipId = event; 
  }

  selectedLocation(event:any)
  {
    this.selectedLocationId = event; 
  }

  get testSetName()
  {
    return this.locationCapabilityForm.get('testSetName');
  }
  get lrupartnumber()
  {
    return this.locationCapabilityForm.get('lrupartnumber');
  }
  get lrudescription()
  {
    return this.locationCapabilityForm.get('lrudescription');
  }
  get locationName()
  {
    return this.locationCapabilityForm.get('locationName');
  }
  get establishedDate()
  {
    return this.locationCapabilityForm.get('establishedDate');
  }

}
