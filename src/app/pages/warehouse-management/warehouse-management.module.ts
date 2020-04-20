import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseManagementComponent } from './warehouse-management.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ModalDeleteWarehouseComponent } from './modal-delete-warehouse/modal-delete-warehouse.component';
import { Router, RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';



@NgModule({
  declarations: [WarehouseManagementComponent, WarehouseComponent, ModalDeleteWarehouseComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    DirectivesModule,
    RouterModule.forChild([{ path: '', component: WarehouseManagementComponent }])
  ],
  entryComponents: [ WarehouseComponent, ModalDeleteWarehouseComponent]
})
export class WarehouseManagementModule { }
