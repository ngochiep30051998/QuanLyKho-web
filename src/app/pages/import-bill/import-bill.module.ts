import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportBillComponent } from './import-bill.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ImportBillComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    FlexLayoutModule,
    RouterModule.forChild([{path: '', component: ImportBillComponent}])
  ]
})
export class ImportBillModule { }
