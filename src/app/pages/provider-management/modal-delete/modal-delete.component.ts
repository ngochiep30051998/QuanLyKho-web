import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProviderComponent } from '../provider/provider.component';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
  ) {
    console.log(dialogData);
   }

  ngOnInit() {
  }

}
