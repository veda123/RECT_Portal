import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ROUTES } from './report.routes';
import { LocationComponent } from './location/location.component';
import { HeaderComponent } from './header/header.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CommonModule } from "@angular/common";
import { LocationPointOfContactComponent } from './location-point-of-contact/location-point-of-contact.component';
import { DataTableModule } from 'angular5-data-table';
import { MatTableModule, MatSortModule , MatPaginatorModule,MatInputModule,MatIconModule,MatNativeDateModule}  from '@angular/material';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { FooterComponent } from '../footer/footer.component';
import { AddLocationPocComponent } from './location-point-of-contact/add-location-poc/add-location-poc.component';
import { DisableControlDirective } from '../disable-control.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { AddButtonComponent } from './widgets/add-button/add-button.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AddEquipmentComponent } from './equipment/add-equipment/add-equipment.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { RepairCapabilityComponent } from './repair-capability/repair-capability.component';
import { AddCapabilityComponent } from './repair-capability/add-capability/add-capability.component';
import { TpsComponent } from './tps/tps.component';
import { AddTpsComponent } from './tps/add-tps/add-tps.component';
import { SortPipe } from '../pipes/sort.pipe';
import { GobackDirective } from '../goback.directive';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';
import { AddMaterialsComponent } from './bill-of-materials/add-materials/add-materials.component';
import { LocationCapabilityComponent } from './location-capability/location-capability.component';
import { AddLocationCapComponent } from './location-capability/add-location-cap/add-location-cap.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    LocationComponent,
    HeaderComponent,
    AdminPanelComponent,
    LocationPointOfContactComponent,
    AddLocationComponent,
    FooterComponent,
    DisableControlDirective,
    AddLocationPocComponent,
    SearchComponent,
    AddButtonComponent,
    EquipmentComponent,
    AddEquipmentComponent,
    CustomerComponent,
    AddCustomerComponent,
    DatepickerComponent,
    InventoryComponent,
    AddInventoryComponent,
    RepairCapabilityComponent,
    AddCapabilityComponent,
    TpsComponent,
    AddTpsComponent,
    SortPipe,
    GobackDirective,
    BillOfMaterialsComponent,
    AddMaterialsComponent,
    LocationCapabilityComponent,
    AddLocationCapComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    DataTableModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    NgbModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class ReportModule { }
