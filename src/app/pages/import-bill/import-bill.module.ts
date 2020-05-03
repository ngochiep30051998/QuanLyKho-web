import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportBillComponent } from './import-bill.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { DateAdapter } from '@angular/material';
import { MyDateAdapter } from '../../commons/dateConfig';

import { MY_DATE_FORMATS } from '../../commons/dateConfig';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
  declarations: [ImportBillComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    FlexLayoutModule,
    PipesModule,
    RouterModule.forChild([{ path: '', component: ImportBillComponent }]),
  ],
  providers: [
    { provide: DateAdapter, useClass: MyDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class ImportBillModule { }
