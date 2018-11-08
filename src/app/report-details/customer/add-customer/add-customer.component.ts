import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute}  from '@angular/router';
import { IEquipment } from '../../../IEquipment';
import { IContractType } from '../../../IContractType';
import { ICustomer } from '../../../ICustomer';
import { EquipmentService } from '../../../services/equipment.service';
import { ContractTypeService } from '../../../services/contract-type.service';
import { CustomerService } from '../../../services/customer.service';
import { InventoryService } from '../../../services/inventory.service';
import { IEquipInventory } from '../../../IEquipInventory';
import { DateInitService } from '../../../services/date-init.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { IUploadFile } from '../../../IUploadFile';
import { DateValidator } from './date.validator';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  equipment:IEquipment[]=[];
  contract:IContractType[]=[];
  customer:ICustomer[]=[];
  inventory:IEquipInventory[]=[];
  fileUpload:IUploadFile[]=[];
  errorMessage:string;
  selectedEquipId:number;
  typeSel:string;
  selectedContractTypeId:number;
  contractSel:string;
  defaultStartDate:string;
  defaultEndDate:string ;
  disable:boolean = true;
  startDateSelected:boolean = false;
  endDateSelected:boolean = false;
  invalidLogin:boolean = false;
  invalidFile:boolean = false;
  invalidDate:boolean = false;
  minlengthName:number = 2;
  maxlengthName:number = 50;
  maxLimit:number = 255;
  id;
  equipId:string;
  contractId:string;
  fileId:File;
  customerNamePattern:string = "[a-zA-Z\\s]+";
  selectedFile:File = null;

  customerForm  = new FormGroup({
    customerName        : new FormControl('',[Validators.required,Validators.minLength(this.minlengthName),Validators.maxLength(this.maxlengthName),
                                              Validators.pattern(this.customerNamePattern)]),
    equipmentname       : new FormControl('',Validators.required),
    serialNumber        : new FormControl('',Validators.required),
    contractStartDate   : new FormControl(''),
    contractEndDate     : new FormControl(''),
    contractType        : new FormControl('',Validators.required),
    contractDetails     : new FormControl('',Validators.required),
    pointOfContact      : new FormControl('',[Validators.minLength(this.minlengthName),Validators.maxLength(this.maxLimit)])
  });


  constructor(private equipmentService:EquipmentService, private contractTypeService:ContractTypeService, private customerService:CustomerService, private uploadService:UploadFileService,
              private router:Router, private route: ActivatedRoute, private inventoryService:InventoryService, private dateService:DateInitService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.route.queryParams.subscribe(params =>{
        this.equipId = params['equipId'];
        this.contractId = params['contractId']
        this.fileId = params['fileId']
        this.typeSel = this.equipId;
        this.contractSel = this.contractId;
        this.selectedFile = this.fileId;
        this.customerForm.get('contractDetails').setValue(this.selectedFile);
      })
      this.getInitialValues();
    }
    else{
      this.getDropDownValues();
      this.defaultStartDate = this.dateService.Initaialise();
      this.defaultEndDate = this.defaultStartDate;
      this.disable = false;
    }
  }

  getInitialValues():void{
    let customerId = parseInt(this.id);
    this.getDropDownValues();
    this.customerService.getCustomerById(customerId).take(1)
        .subscribe(customer =>{
          this.customer=customer;
          this.defaultStartDate = this.customer["contractStartDate"];
          this.defaultStartDate = this.defaultStartDate.slice(0, 10);
          this.defaultEndDate = this.customer["contractEndDate"];
          this.defaultEndDate = this.defaultEndDate.slice(0, 10);
      },
    error => this.invalidLogin = true);
  }

  getDropDownValues():any{
    this.inventoryService.getInventory()
        .subscribe(inventory => this.inventory = inventory,
        error => this.errorMessage = <any>error);
    this.contractTypeService.getContractType()
        .subscribe(contract => this.contract = contract,
          error => this.invalidLogin = true); 
  }

  processCustomer(customer:ICustomer){
    this.defaultDateSelection(customer);
    if(customer['contractStartDate'] > customer['contractEndDate']){
      this.invalidDate = true;
    }
    else{
    if(this.id){
      this.customerService.updateCustomer(this.id,customer)
        .subscribe(customer => this.router.navigate(['/admin/contract']),
      error => this.invalidLogin = true); 
    }
    else{
      const formData = new FormData();
      formData.append('file',this.selectedFile, this.selectedFile.name);
      this.uploadService.uploadFile(formData)
          .subscribe(fileUpload =>  {
            customer['contractDetails'] = fileUpload['id'];
            this.customerService.addCustomer(customer,this.selectedEquipId,this.selectedContractTypeId,fileUpload['id'])
                .subscribe(customer => this.router.navigate(['/admin/contract']),
              error => this.invalidLogin = true);
          },
        error => this.invalidFile = true);
      }
    }
  }

  defaultDateSelection(customer:ICustomer):void{
    if (!this.startDateSelected && !this.endDateSelected){
      customer['contractStartDate'] = this.defaultStartDate;
      customer['contractEndDate']   = this.defaultEndDate;
    }
    else if(!this.startDateSelected && this.endDateSelected){
      customer['contractStartDate'] = this.defaultStartDate;
    }
    else if(this.startDateSelected && !this.endDateSelected){
      customer['contractEndDate'] = this.defaultEndDate;
    }
  }

  onNotify(date){
    this.startDateSelected = true;
    let endDate = this.customerForm.get('contractEndDate').value;
    this.customerForm.get('contractStartDate').setValue(date);
  }

  onNotifyEndDate(date){
    this.endDateSelected = true;
    this.customerForm.get('contractEndDate').setValue(date);
  }

  reset():void{
    this.invalidLogin = false;
    if(this.id) this.getInitialValues();
    else this.customerForm.reset();
  }

  onFileSelected(event){
    this.customerForm.get('contractDetails').reset();
    this.selectedFile=<File>event.target.files[0];
    if(this.selectedFile){
      this.customerForm.get('contractDetails').setValue("uploaded");
    }
  }

  selectedEquipName(event:any)
  {
    this.selectedEquipId = event; 
  }

  selectedContractType(event:any)
  {
    this.selectedContractTypeId = event; 
  }

  get customerName()
  {
    return this.customerForm.get('customerName');
  }
  get equipmentname()
  {
    return this.customerForm.get('equipmentname');
  }
  get serialNumber()
  {
    return this.customerForm.get('serialNumber');
  }
  get contractStartDate()
  {
    return this.customerForm.get('contractStartDate');
  }
  get contractEndDate()
  {
    return this.customerForm.get('contractEndDate');
  }
  get contractType()
  {
    return this.customerForm.get('contractType');
  }
  get contractDetails()
  {
    return this.customerForm.get('contractDetails');
  }
  get pointOfContact()
  {
    return this.customerForm.get('pointOfContact');
  }
}
