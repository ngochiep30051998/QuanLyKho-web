import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportManagementComponent } from './import-management.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [ImportManagementComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ImportManagementComponent }])
  ]
})
export class ImportManagementModule { }
