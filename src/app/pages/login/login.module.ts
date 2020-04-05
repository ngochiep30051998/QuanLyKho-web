import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }])
  ]
})
export class LoginModule { }
