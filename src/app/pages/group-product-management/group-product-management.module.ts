import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupProductManagementComponent } from './group-product-management.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GroupProductComponent } from './group-product/group-product.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [GroupProductManagementComponent, GroupProductComponent, ModalDeleteComponent],
  entryComponents: [GroupProductComponent, ModalDeleteComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: GroupProductManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class GroupProductManagementModule { }
