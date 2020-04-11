import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.css']
})
export class GroupProductComponent implements OnInit {

  public groupProductForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<GroupProductComponent>,
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
    this.groupProductForm = this.fb.group({
      Ma: [''],
      Ten: [''],
    });
  }

  setFormData() {
    this.groupProductForm.setValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
    });
  }

}
