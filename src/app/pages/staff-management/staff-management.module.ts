import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementComponent } from './staff-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StaffManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: StaffManagementComponent }])
  ]
})
export class StaffManagementModule { }
