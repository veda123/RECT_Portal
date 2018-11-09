import { Routes, CanActivateChild } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './report-details/header/header.component';
import { AdminPanelComponent } from './report-details/admin-panel/admin-panel.component';
import { LocationComponent } from './report-details/location/location.component';
import { InventoryComponent } from './report-details/inventory/inventory.component';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AllReportsComponent } from './all-reports/all-reports.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';

export const ROUTES: Routes = [
  {path : '', redirectTo: '/login', pathMatch: 'full'},
  {path : 'login', component: LoginComponent},
  {path : 'redirect', component:LoginRedirectComponent},
  {path: 'implicit/callback',component: OktaCallbackComponent},
  {path : 'admin', loadChildren: 'app/report-details/report.module#ReportModule',
    canActivateChild:[AuthGuard,AdminAuthGuard]},
  {path : 'report', component : AllReportsComponent},
  {path : "AccessDenied", component : AccessDeniedComponent},
  {path :"PageNotFound",component :PageNotFoundComponent},
  {path :"**",component :PageNotFoundComponent}
];
