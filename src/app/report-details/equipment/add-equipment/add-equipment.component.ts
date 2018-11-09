import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { IEquipment } from '../../../IEquipment';
import { IEquipmentType } from '../../../IEquipmentType';
import {  Router,ActivatedRoute } from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { EquipmentTypeService } from '../../../services/equipment-type.service';

@Component({
  selector: 'app-add-equipment',
  templateUrl: './add-equipment.component.html',
  styleUrls: ['./add-equipment.component.css']
})

export class AddEquipmentComponent implements OnInit {
  equipment:IEquipment[]=[];
  equipType:IEquipmentType[]=[];
  selectedTypeID:number;
  typeSel:string;
  name:string;
  errorMessage:string;
  id;
  disable:boolean = true;
  invalidLogin:boolean = false;
  minlengthName:number = 3;
  maxlengthName:number = 50;
  maxLimit:number = 255;

  equipmentForm  = new FormGroup({
    equipmentname          : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    equipmentPartNumber    : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    description            : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxLimit)]),
    equipmentType          : new FormControl('',Validators.required)
  });

  constructor(private router:Router, private route: ActivatedRoute, private equipmentService:EquipmentService,private equipTypeService:EquipmentTypeService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.name = params['name'];
        this.typeSel = this.name;
      })
      this.getInitialValues();
    }
    else{
      this.getEquipType();
      this.disable = false;
    }
  }

  getInitialValues():void{
    let equipmentId = parseInt(this.id);
    this.getEquipType();
    this.equipmentService.getEquipmentById(equipmentId).take(1)
        .subscribe(equipment =>this.equipment=equipment,
        error => this.invalidLogin = true);
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.equipmentForm.reset();
  }

  selectedType(event:any)
  {
    this.selectedTypeID = event; 
  }

  processEquipment(equipment:IEquipment){
    if(this.id){
      this.equipmentService.updateEquipment(this.id,equipment)
        .subscribe(equipment =>
          this.router.navigate(['/admin/equipment']),
      error => this.invalidLogin = true); 
    }
    else{
      this.equipmentService.addEquipment(equipment,this.selectedTypeID)
        .subscribe(equipment =>
          this.router.navigate(['/admin/equipment']),
      error => this.invalidLogin = true);  
    }
  }
  
  getEquipType():any{
    this.equipTypeService.getEquipmentType()
        .subscribe(equipType => this.equipType = equipType,
          error => this.invalidLogin = true);
  }

  get equipmentname()
  {
    return this.equipmentForm.get('equipmentname');
  }

  get equipmentPartNumber()
  {
    return this.equipmentForm.get('equipmentPartNumber');
  }

  get description()
  {
    return this.equipmentForm.get('description');
  }

  get equipmentType()
  {
    return this.equipmentForm.get('equipmentType');
  }


}
