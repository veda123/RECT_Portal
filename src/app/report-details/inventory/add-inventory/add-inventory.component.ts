import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { LocationService } from '../../../services/location.service';
import { InventoryService } from '../../../services/inventory.service';
import { IEquipment } from '../../../IEquipment';
import { ILocation } from '../../../ILocation';
import { IEquipInventory } from '../../../IEquipInventory';
import { DateInitService } from '../../../services/date-init.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.css']
})
export class AddInventoryComponent implements OnInit {
  equipment:IEquipment[]=[];
  location:ILocation[]=[];
  inventory:IEquipInventory[]=[];
  errorMessage:string;
  selectedEquipId:number;
  selectedLocationId:number;
  locationSel:string;
  typeSel:string;
  name:string;
  locId:string;
  id;
  disable:boolean = true;
  invalidLogin:boolean = false;
  dateSelected:boolean = false;
  pattern:string = "[a-zA-Z\\s]+";
  defaultDate:string;
  minlengthName:number = 3;
  maxlengthName:number = 50;
  maxLimit:number = 10;

  inventoryForm = new FormGroup({
    equipmentname         : new FormControl('',Validators.required),
    equipmentPartNumber   : new FormControl('',Validators.required),
    serialNumber          : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    rev                   : new FormControl('',[Validators.required,Validators.maxLength(this.maxLimit)]),
    manufactureDate       : new FormControl(''),
    status                : new FormControl('',[Validators.required,Validators.pattern(this.pattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    owner                 : new FormControl('',[Validators.required,Validators.pattern(this.pattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    ownership             : new FormControl('',[Validators.required,Validators.pattern(this.pattern),Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    locationName          : new FormControl('',Validators.required)
  });

  constructor(private equipmentService:EquipmentService,private locationService:LocationService,private inventoryService:InventoryService,private dateService:DateInitService,
              private router:Router, private route: ActivatedRoute){ }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.name = params['name'];
        this.locId = params['location']
        this.typeSel = this.name;
        this.locationSel = this.locId;
      })
      this.getInitialValues();
    }
    else{
      this.getDropDownValues();
      this.defaultDate = this.dateService.Initaialise();
      this.disable = false;
    }
  }

  getInitialValues():void{
    let inventoryId = parseInt(this.id);
    this.getDropDownValues();
    this.inventoryService.getInventoryById(inventoryId).take(1)
        .subscribe(inventory =>{
          this.inventory=inventory
        this.defaultDate = this.inventory["manufactureDate"];
        this.defaultDate = this.defaultDate.slice(0, 10);
      },
    error => this.invalidLogin = true);
  }

  getDropDownValues():any{
    this.equipmentService.getEquipments()
        .subscribe(equipment => this.equipment = equipment,
          error => this.invalidLogin = true);
    this.locationService.getLocations()
        .subscribe(location => this.location = location,
          error => this.invalidLogin = true); 
  }

  processInventory(inventory:IEquipInventory){
    if (!this.dateSelected){
      inventory['manufactureDate'] = this.defaultDate;
    }
    if(this.id){
      this.inventoryService.updateInventory(this.id,inventory)
          .subscribe(inventory =>this.router.navigate(['/admin/inventory']),
          error => this.invalidLogin = true);  
    }
    else{
    this.inventoryService.addInventory(inventory,this.selectedEquipId,this.selectedLocationId)
        .subscribe(inventory =>this.router.navigate(['/admin/inventory']),
        error => this.invalidLogin = true);  
    }   
  }
  
  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.inventoryForm.reset();
  }

  selectedEquipName(event:any)
  {
    this.selectedEquipId = event; 
  }

  selectedLocation(event:any)
  {
    this.selectedLocationId = event; 
  }

  onNotify(date){
    this.dateSelected = true;
    this.inventoryForm.get('manufactureDate').setValue(date);
  }

  get equipmentname()
  {
    return this.inventoryForm.get('equipmentname');
  }

  get equipmentPartNumber()
  {
    return this.inventoryForm.get('equipmentPartNumber');
  }

  get serialNumber()
  {
    return this.inventoryForm.get('serialNumber');
  }
  get rev()
  {
    return this.inventoryForm.get('rev');
  }
  get manufactureDate()
  {
    return this.inventoryForm.get('manufactureDate');
  }
  get status()
  {
    return this.inventoryForm.get('status');
  }
  get owner()
  {
    return this.inventoryForm.get('owner');
  }
  get ownership()
  {
    return this.inventoryForm.get('ownership');
  }
  get locationName()
  {
    return this.inventoryForm.get('locationName');
  }
}
