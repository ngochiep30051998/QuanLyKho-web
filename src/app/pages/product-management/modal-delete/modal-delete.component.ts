import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductComponent } from '../product/product.component';
import { IDiglogProduct } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogProduct,
  ) {
    console.log(dialogData)
   }

  ngOnInit() {
  }

}
