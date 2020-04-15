import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingInsideBtnComponent } from './loading-inside-btn/loading-inside-btn.component';
import { DemoMaterialModule } from '../demo-material-module';



@NgModule({
  declarations: [
    LoadingInsideBtnComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
  ],
  exports: [
    LoadingInsideBtnComponent
  ]
})
export class ComponentsModule { }
