import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderManagementComponent } from './provider-management.component';
import { RouterModule } from '@angular/router';
import { ProviderComponent } from './provider/provider.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [ProviderManagementComponent, ProviderComponent, ModalDeleteComponent],
  entryComponents: [ProviderComponent, ModalDeleteComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ProviderManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ProviderManagementModule { }
