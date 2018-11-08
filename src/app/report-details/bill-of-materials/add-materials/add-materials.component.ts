import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { EquipmentService } from '../../../services/equipment.service';
import { IEquipment } from '../../../IEquipment';
import { IBillOfMaterails } from '../../../IBillOfMaterials';
import { DateInitService } from '../../../services/date-init.service';
import { BomService } from '../../../services/bom.service';

@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.css']
})
export class AddMaterialsComponent implements OnInit {
  equipment:IEquipment[]=[];
  equipmentPart:IEquipment[]=[];
  billOfMaterails:IBillOfMaterails[]=[];
  errorMessage:string;
  selectedEquipId:number;
  selectedPartId:number;
  typeSel:string;
  partSel:string;
  disable:boolean = true;
  invalidLogin:boolean = false;
  minlengthName:number = 3;
  maxlengthName:number = 50;
  maxManufactureLimit:number = 100;
  maxLimit:number = 255;
  quantityPattern:string = "[0-9]+";
  equipId:string;
  equipPartId:string;
  id;

  materialsForm = new FormGroup({
    equipmentname         : new FormControl('',Validators.required),
    lrupartnumber         : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName)]),
    equipmentPartNumber   : new FormControl('',Validators.required),
    manufacture           : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxManufactureLimit)]),
    description           : new FormControl('',Validators.required),
    quantity              : new FormControl('',[Validators.required,Validators.pattern(this.quantityPattern),Validators.min(1),Validators.max(10000)]),
  });

  constructor(private equipmentService:EquipmentService,private router:Router, private route: ActivatedRoute,private dateService:DateInitService,private bomService:BomService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.equipId = params['equipId'];
        this.equipPartId = params['equipPartId'];
        this.typeSel = this.equipId;
        this.partSel = this.equipPartId;
      })
      this.getInitialValues();
    }
    else{
      this.getDropDownValues();
      this.disable = false;
    }
  }

  getInitialValues():void{
    let materialId = parseInt(this.id);
    this.getDropDownValues();
    this.bomService.getBOMById(materialId).take(1)
        .subscribe(billOfMaterails => this.billOfMaterails = billOfMaterails,
        error => this.invalidLogin = true);
  }

  getDropDownValues():any{
    this.equipmentService.getEquipments()
        .subscribe(equipment =>{
          this.equipment = equipment;
          this.equipmentPart = equipment;
          this.equipment = this.equipment.filter(element => element.equipmentType.equipmentType === ("Test Set") || 
                                                element.equipmentType.equipmentType === ("Manual Bench"));
          this.equipmentPart = this.equipmentPart.filter(element => element.equipmentType.equipmentType != ("Test Set"))
        },
       error => this.invalidLogin = true);
  }

  processBillOfMaterials(bom:IBillOfMaterails){

    if(this.id){
      this.bomService.updateBOM(this.id,bom)
          .subscribe(bom =>this.router.navigate(['/admin/bill-of-materials']),
          error => this.invalidLogin = true);  
    }
    else{
    this.bomService.addBOM(bom,this.selectedEquipId,this.selectedPartId)
        .subscribe(inventory =>this.router.navigate(['/admin/bill-of-materials']),
        error => this.invalidLogin = true);  
    }   
  }

  selectedEquipName(event:any)
  {
    this.selectedEquipId = event; 
  }

  selectedEquipPartNumber(event:any)
  {
    this.selectedPartId = event; 
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.materialsForm.reset();
  }

  get equipmentname()
  {
    return this.materialsForm.get('equipmentname');
  }
  get equipmentPartNumber()
  {
    return this.materialsForm.get('equipmentPartNumber');
  }
  get lrupartnumber()
  {
    return this.materialsForm.get('lrupartnumber');
  }
  get manufacture()
  {
    return this.materialsForm.get('manufacture');
  }
  get description()
  {
    return this.materialsForm.get('description');
  }
  get quantity()
  {
    return this.materialsForm.get('quantity');
  }
}
