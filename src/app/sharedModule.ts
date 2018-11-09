import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './report-details/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [ CommonModule],
    declarations :[HeaderComponent],
    exports:[CommonModule,HeaderComponent,MatProgressSpinnerModule]
})

export class SharedModule {}