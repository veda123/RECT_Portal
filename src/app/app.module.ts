import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './report-details/header/header.component';
import { AdminPanelComponent } from './report-details/admin-panel/admin-panel.component';
import { LocationComponent } from './report-details/location/location.component';
import { LocationService } from './services/location.service';
import { LocationPocService } from './services/location-poc.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './report-details/confirmation-dialog/confirmation-dialog.component';
import { CountryService } from './services/country.service';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { EquipmentService } from './services/equipment.service';
import { EquipmentTypeService } from './services/equipment-type.service';
import { CustomerService } from './services/customer.service';
import { ContractTypeService } from './services/contract-type.service';
import { InventoryService } from './services/inventory.service';
import { RepairToolsService } from './services/repair-tools.service';
import { RepairCapabilityService } from './services/repair-capability.service';
import { TpsService } from './services/tps.service';
import { SortPipe } from './pipes/sort.pipe';
import { GobackDirective } from './goback.directive';
import { DateInitService } from './services/date-init.service';
import { BomService } from './services/bom.service';
import { LocationCapabilityService } from './services/location-capability.service';
import { UploadFileService } from './services/upload-file.service';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LocationGuard } from './services/location-guard.service';
import { LocationPocGuard } from './services/location-poc-guard.service';
import { LocationCapGuard } from './services/location-cap-guard.service';
import { CustomerGuard } from './services/customer-guard.service';
import { InventoryGuard } from './services/inventory-guard.service';
import { EquipmentGuard } from './services/equipment-guard.service';
import { RepairKitGuard } from './services/repair-kit-guard.service';
import { TpsGuard } from './services/tps-guard.service';
import { BomGuard } from './services/bom-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ModalComponent } from './report-details/modal/modal.component';
import { Okta } from './shared/okta/okta.service';
import {  OktaAuthModule } from '@okta/okta-angular';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component'
import { SharedModule } from './sharedModule';

const config = {
  issuer: 'https://dev-764880.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oag8yv4txsXLDfZ40h7'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    PageNotFoundComponent,
    AllReportsComponent,
    AccessDeniedComponent,
    ModalComponent,
    LoginRedirectComponent
 ],
  entryComponents: [ConfirmationDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    OktaAuthModule.initAuth(config),
    SharedModule
  ],
  providers: [LocationService,LocationPocService,ConfirmationDialogService,CountryService,AuthService,BomService,LocationCapabilityService,UploadFileService,AuthGuard,
    LocationGuard,LocationPocGuard,LocationCapGuard,CustomerGuard,InventoryGuard,EquipmentGuard,RepairKitGuard,TpsGuard,BomGuard,AdminAuthGuard,Okta,
    EquipmentService,EquipmentTypeService,CustomerService,ContractTypeService,InventoryService,RepairToolsService,RepairCapabilityService,TpsService,DateInitService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
