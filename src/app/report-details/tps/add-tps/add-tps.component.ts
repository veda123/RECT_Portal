import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { IRepairCapability } from '../../../IRepairCapability';
import { RepairCapabilityService } from '../../../services/repair-capability.service';
import { Itps } from '../../../Itps';
import { TpsService } from '../../../services/tps.service';
import { DateInitService } from '../../../services/date-init.service';

@Component({
  selector: 'app-add-tps',
  templateUrl: './add-tps.component.html',
  styleUrls: ['./add-tps.component.css']
})
export class AddTpsComponent implements OnInit {
  repairCapability:IRepairCapability[]=[];
  tps:Itps[]=[];
  defaultDate:string ;
  disable:boolean = true;
  dateSelected:boolean = false;
  invalidLogin:boolean = false;
  errorMessage:string;
  selectedCapabilityId:number;
  selectedCapabilityId1:number;
  testSetSel:string;
  PartNumberSel:string;
  name:string;
  lru:string;
  locId:string;
  id;
  uniqueTestSetNames: string[];
  minlengthName:number = 2;
  maxlengthName:number = 50;
  maxLimit:number = 255;

  constructor(private router:Router, private route: ActivatedRoute,private repairCapabilityService:RepairCapabilityService, private tpsService:TpsService,
    private dateService:DateInitService) { }

  tpsForm  = new FormGroup({
    capabilityEquipmentname   : new FormControl('',Validators.required),
    lrupartnumber             : new FormControl('',Validators.required),
    tpsName                   : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxLimit)]),
    tpsPart                   : new FormControl('',[Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    version                   : new FormControl('',[Validators.required,Validators.maxLength(this.maxlengthName)]),
    releaseDate               : new FormControl(''),
    checksum                  : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    checksumType              : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    comments                  : new FormControl('',[Validators.minLength(this.minlengthName),Validators.maxLength(this.maxLimit)]),
    releaseNotes              : new FormControl('',[Validators.minLength(this.minlengthName),Validators.maxLength(this.maxLimit)])
  });

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    let tpsId = parseInt(this.id);
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.name = params['name'];
        this.testSetSel = this.name;
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
    let tpsId = parseInt(this.id);
    this.getDropDownValues();
      this.tpsService.getTPSById(tpsId).take(1)
        .subscribe(tps =>{
          this.tps = tps;
          this.defaultDate = this.tps["releaseDate"];
          this.defaultDate = this.defaultDate.slice(0, 10);
        },
      error => this.invalidLogin = true);
  }
  

  getDropDownValues():any{
    this.repairCapabilityService.getCapability()
        .subscribe(repairCapability =>{
          this.repairCapability = repairCapability;
        },
          error => this.invalidLogin = true); 
  }

  processTPS(tps:Itps){
    if (!this.dateSelected){
      tps['releaseDate'] = this.defaultDate;
    }
    if(this.id){
      this.tpsService.updateTPS(this.id,tps)
          .subscribe(tps =>
            this.router.navigate(['/admin/tps']),
          error => this.invalidLogin = true);  
    }
    else{
      this.tpsService.addTPS(tps,this.selectedCapabilityId)
        .subscribe(tps =>this.router.navigate(['/admin/tps']),
        error => this.invalidLogin = true);  
    }  
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.tpsForm.reset();
  }

  selectedTestName(event:any)
  {
    this.selectedCapabilityId = event; 
  }

  selectedPartNumber(event:any)
  {
    this.selectedCapabilityId1 = event; 
  }

  onNotify(date){
    this.dateSelected = true;
   this.tpsForm.get('releaseDate').setValue(date);
  }

  get capabilityEquipmentname()
  {
    return this.tpsForm.get('capabilityEquipmentname');
  }
  get lrupartnumber()
  {
    return this.tpsForm.get('lrupartnumber');
  }
  get tpsName()
  {
    return this.tpsForm.get('tpsName');
  }
  get tpsPart()
  {
    return this.tpsForm.get('tpsPart');
  }
  get version()
  {
    return this.tpsForm.get('version');
  }
  get releaseDate()
  {
    return this.tpsForm.get('releaseDate');
  }
  get checksum()
  {
    return this.tpsForm.get('checksum');
  }
  get checksumType()
  {
    return this.tpsForm.get('checksumType');
  }
  get comments()
  {
    return this.tpsForm.get('comments');
  }
  get releaseNotes()
  {
    return this.tpsForm.get('releaseNotes');
  }
}
