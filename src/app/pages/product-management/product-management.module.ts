import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ProductComponent } from './product/product.component';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [ProductManagementComponent, ProductComponent],
  entryComponents: [ProductComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild([{ path: '', component: ProductManagementComponent }])
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
]
})
export class ProductManagementModule { }
