import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderManagementComponent } from './provider-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProviderManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProviderManagementComponent }])
  ]
})
export class ProviderManagementModule { }
