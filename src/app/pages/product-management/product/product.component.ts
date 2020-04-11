import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IProduct, IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
  ) {
    console.log(this.dialogData);
    // this.dialogRef.getState()
    this.initForm();
    if (this.dialogData.type === 'edit') {
      this.setFormData();
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.productForm = this.fb.group({
      Ma: [''],
      Ten: [''],
      DonGia: [''],
      NhomVatTu: [''],
      NhaCungCap: [''],
      DonViTinh: [''],
      SoLuong: [''],
    });
  }

  setFormData() {
    this.productForm.setValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      DonGia: this.dialogData.data.DonGia,
      NhomVatTu: this.dialogData.data.NhomVatTu,
      NhaCungCap: this.dialogData.data.NhaCungCap,
      DonViTinh: this.dialogData.data.DonViTinh,
      SoLuong: this.dialogData.data.SoLuong,
    });
  }
}
