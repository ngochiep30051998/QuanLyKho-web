import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ModalDeleteUserComponent } from './modal-delete-user/modal-delete-user.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



@NgModule({
  declarations: [AccountManagementComponent, AccountComponent, ModalDeleteUserComponent],
  entryComponents: [ AccountComponent, ModalDeleteUserComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AccountManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class AccountManagementModule { }
