import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountManagementComponent } from './account-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AccountManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AccountManagementComponent }])
  ]
})
export class AccountManagementModule { }
