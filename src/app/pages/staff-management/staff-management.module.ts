import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffManagementComponent } from './staff-management.component';
import { RouterModule } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { ModalDeleteStaffComponent } from './modal-delete-staff/modal-delete-staff.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



@NgModule({
  declarations: [StaffManagementComponent, StaffComponent, ModalDeleteStaffComponent],
  entryComponents: [StaffComponent, ModalDeleteStaffComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: StaffManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StaffManagementModule { }
