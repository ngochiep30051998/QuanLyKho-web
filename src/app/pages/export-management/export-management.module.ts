import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportManagementComponent } from './export-management.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ExportManagementComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    RouterModule.forChild([{ path: '', component: ExportManagementComponent }])
  ]
})
export class ExportManagementModule { }
