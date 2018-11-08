import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { RepairCapabilityService } from '../../../services/repair-capability.service';
import { RepairToolsService } from '../../../services/repair-tools.service';
import { IRepairCapability } from '../../../IRepairCapability';
import { IRepairTools } from '../../../IRepairTools';
import { element, Capability } from 'protractor';
import { IEquipment } from '../../../IEquipment';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-add-capability',
  templateUrl: './add-capability.component.html',
  styleUrls: ['./add-capability.component.css']
})
export class AddCapabilityComponent implements OnInit {
  repairCapability:IRepairCapability[]=[];
  repairTool:IRepairTools[]=[];
  equipment:IEquipment[]=[];
  toolEquipment:IEquipment[]=[];
  repairEquipment:IEquipment[]=[];
  filteredValue : IRepairCapability[]=[];
  errorMessage:string;
  selectedEquipId:number;
  selectedRepairId:number;
  typeSel:string;
  id;
  topLevelName;
  toolReq;
  req;
  testSetId:any;
  repairSel:string;
  disable:boolean = true;
  invalidLogin:boolean = false;
  quantityPattern:string = "[0-9]+";
  minlengthName:number = 3;
  maxlengthName:number = 50;
  maxDescription:number = 100;

  repairCapabilityForm  = new FormGroup({
    testSetName         : new FormControl('',Validators.required),
    lrupartnumber       : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    lrudescription      : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxDescription)]),
    toolName            : new FormControl(''),
    description         : new FormControl(''),
    toolPartNumber      : new FormControl(''),
    quantity            : new FormControl('',[Validators.required,Validators.pattern(this.quantityPattern),Validators.min(1),Validators.max(10000)]),
    cmm                 : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)])
  });

  constructor(private router:Router, private route: ActivatedRoute, private repairCapabilityService:RepairCapabilityService, private repairToolService:RepairToolsService,
              private equipmentService:EquipmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.topLevelName = params['topLevelName'];
        this.toolReq = params['toolReq'];
        this.req = params['req'];
        this.typeSel = this.toolReq;
        this.repairSel = this.topLevelName;
      })
      this.getInitialValues();
    }
    else{
      this.getDropDownValues();
      this.disable = false;
    }
  }

  getInitialValues():void{
    let inventoryId = parseInt(this.id);
    this.getDropDownValues();
    this.repairCapabilityService.getCapabilityById(this.req).take(1)
      .subscribe(repairCapability =>{
        this.repairCapability=repairCapability
    },
    error => this.invalidLogin = true);
    this.repairToolService.getToolById(this.id).take(1)
      .subscribe(repairTool =>{
        this.repairTool=repairTool
    },
    error => this.invalidLogin = true); 
  }

  getDropDownValues():any{
    this.equipmentService.getEquipments()
        .subscribe(equipment => {
          this.equipment = equipment;
          this.toolEquipment   = this.equipment.filter(element => element.equipmentType.equipmentType !== ("Test Set"));
          this.repairEquipment = this.equipment.filter(element => element.equipmentType.equipmentType === ("Test Set") || element.equipmentType.equipmentType === ("Manual Bench"));
        },
      error =>this.invalidLogin = true);          
  }

  processCapability(capability){
    if(this.id){
      if(this.typeSel===""){
        this.repairToolService.updateRepairToolByQuantity(this.id,capability)
        .subscribe(repairTool =>this.router.navigate(['/admin/Repair-kits']),
         error => this.errorMessage = <any>error);
      }
      else{
        this.repairToolService.updateRepairTool(this.id,parseInt(this.typeSel),capability)
          .subscribe(repairTool =>this.router.navigate(['/admin/Repair-kits']),
          error => this.invalidLogin = true); 
      }  
    }
    else{
    this.repairCapabilityService.getCapability()
        .subscribe(repairCapability =>{
          this.repairCapability = repairCapability;
            repairCapability.forEach((element, index) => {
              if(element['lrupartnumber'] === (capability["lrupartnumber"].trim()) && element.equipment.equipmentID === (parseInt(capability["testSetName"].trim()))){
                  this.testSetId = element.capabilityId         
              }
            }) 
            if (typeof this.testSetId !== 'undefined'){
              if(typeof this.typeSel !== 'undefined'){
                this.repairToolService.addRepairTool(capability,this.selectedEquipId,this.testSetId)
              .subscribe(repairTool => {
                this.repairTool = repairTool;
                this.router.navigate(['/admin/Repair-kits']);
              },
              error => this.invalidLogin = true);
              }
              else{
                this.repairToolService.addRepairQuantity(capability,this.testSetId)
                     .subscribe(repairTool => {
                  this.repairTool = repairTool;
                  this.router.navigate(['/admin/Repair-kits']);
              },
               error => this.invalidLogin = true);
            }
          }
          else{
            this.repairCapabilityService.addRepairCapability(capability,this.selectedRepairId)
            .subscribe(repairCapability =>{
              this.repairCapability = repairCapability;
              if(typeof this.typeSel !== 'undefined'){
                this.repairToolService.addRepairTool(capability,this.selectedEquipId,repairCapability["capabilityId"])
              .subscribe(repairTool => {
                this.repairTool = repairTool;
                this.router.navigate(['/admin/Repair-kits']);
              },
              error => this.invalidLogin = true);
              }
              else{
                this.repairToolService.addRepairQuantity(capability,repairCapability["capabilityId"])
                  .subscribe(repairTool => {
                  this.repairTool = repairTool;
                  this.router.navigate(['/admin/Repair-kits']);
              },
               error => this.invalidLogin = true);
              }
            },
            error => this.invalidLogin = true); 
          }
        })
      }
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.repairCapabilityForm.reset();
  }

  selectedEquipName(event:any)
  {
    this.selectedEquipId = event; 
  }
  selectedRepairTestName(event:any)
  {
    this.selectedRepairId = event; 
  }
  
  get testSetName()
  {
    return this.repairCapabilityForm.get('testSetName');
  }
  get lrupartnumber()
  {
    return this.repairCapabilityForm.get('lrupartnumber');
  }
  get lrudescription()
  {
    return this.repairCapabilityForm.get('lrudescription');
  }
  get quantity()
  {
    return this.repairCapabilityForm.get('quantity');
  }
  get cmm()
  {
    return this.repairCapabilityForm.get('cmm');
  }

}
