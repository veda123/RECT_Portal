import { EquipmentGuard } from './../services/equipment-guard.service';
import { Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LocationPointOfContactComponent } from './location-point-of-contact/location-point-of-contact.component';
import { AddLocationComponent } from './location/add-location/add-location.component';
import { AddLocationPocComponent } from './location-point-of-contact/add-location-poc/add-location-poc.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { AddEquipmentComponent } from './equipment/add-equipment/add-equipment.component';
import { CustomerComponent } from './customer/customer.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';
import { RepairCapabilityComponent } from './repair-capability/repair-capability.component';
import { AddCapabilityComponent } from './repair-capability/add-capability/add-capability.component';
import { TpsComponent } from './tps/tps.component';
import { AddTpsComponent } from './tps/add-tps/add-tps.component';
import { BillOfMaterialsComponent } from './bill-of-materials/bill-of-materials.component';
import { AddMaterialsComponent } from './bill-of-materials/add-materials/add-materials.component';
import { LocationCapabilityComponent } from './location-capability/location-capability.component';
import { AddLocationCapComponent } from './location-capability/add-location-cap/add-location-cap.component';
import { AuthGuard } from '../services/auth-guard.service';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LocationGuard } from '../services/location-guard.service';
import { LocationPocGuard } from '../services/location-poc-guard.service';
import { LocationCapGuard } from '../services/location-cap-guard.service';
import { CustomerGuard } from '../services/customer-guard.service';
import { InventoryGuard } from '../services/inventory-guard.service';
import { RepairKitGuard } from '../services/repair-kit-guard.service';
import { TpsGuard } from '../services/tps-guard.service';
import { BomGuard } from '../services/bom-guard.service';
import { AdminAuthGuard } from '../services/admin-auth-guard.service';

export const ROUTES: Routes = [
  {path : '', component: AdminPanelComponent, children: [
    {path : 'location', component: LocationComponent, canActivateChild:[AdminAuthGuard]},
    {path : 'locationPOC', component: LocationPointOfContactComponent},
    {path : 'location/new', component:AddLocationComponent},
    {path : 'location/edit/:id', component:AddLocationComponent, canActivate:[LocationGuard]},
    {path : 'locationPOC/new', component: AddLocationPocComponent},
    {path : 'locationPOC/edit/:id',component: AddLocationPocComponent, canActivate:[LocationPocGuard]},
    {path : 'equipment', component: EquipmentComponent},
    {path : 'equipment/new', component: AddEquipmentComponent},
    {path : 'equipment/edit/:id',component: AddEquipmentComponent, canActivate:[EquipmentGuard]},
    {path : 'contract',component: CustomerComponent},
    {path : 'contract/new', component: AddCustomerComponent},
    {path : 'contract/edit/:id', component: AddCustomerComponent, canActivate:[CustomerGuard]},
    {path : 'inventory',component: InventoryComponent,canActivateChild:[AdminAuthGuard]},
    {path : 'inventory/new', component: AddInventoryComponent},
    {path : 'inventory/edit/:id',component: AddInventoryComponent, canActivate:[InventoryGuard]},
    {path : 'Repair-kits', component: RepairCapabilityComponent},
    {path : 'Repair-kits/new', component : AddCapabilityComponent},
    {path : 'Repair-kits/edit/:id', component : AddCapabilityComponent, canActivate:[RepairKitGuard]},
    {path : 'tps', component: TpsComponent},
    {path : 'tps/new', component: AddTpsComponent},
    {path : 'tps/edit/:id', component: AddTpsComponent, canActivate:[TpsGuard]},
    {path : 'bill-of-materials', component: BillOfMaterialsComponent},
    {path : 'bill-of-materials/new', component: AddMaterialsComponent},
    {path : 'bill-of-materials/edit/:id', component: AddMaterialsComponent, canActivate:[BomGuard]},
    {path : 'repairCapability', component: LocationCapabilityComponent},
    {path : 'repairCapability/new', component: AddLocationCapComponent},
    {path : 'repairCapability/edit/:id', component: AddLocationCapComponent, canActivate:[LocationCapGuard]},
    {path : "", redirectTo:'equipment',pathMatch:'full'}
  ]}
];
