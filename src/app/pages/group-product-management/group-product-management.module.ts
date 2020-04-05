import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupProductManagementComponent } from './group-product-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [GroupProductManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GroupProductManagementComponent }])
  ]
})
export class GroupProductManagementModule { }
