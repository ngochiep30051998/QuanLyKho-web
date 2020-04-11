import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public providerForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ProviderComponent>,
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
    this.providerForm = this.fb.group({
      Ma: [''],
      Ten: [''],
      DiaChi: [''],
      Email: [''],
      SDT: [''],
      NguoiDaiDien: [''],
    });
  }

  setFormData() {
    this.providerForm.setValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      DiaChi: this.dialogData.data.DiaChi,
      Email: this.dialogData.data.Email,
      SDT: this.dialogData.data.SDT,
      NguoiDaiDien: this.dialogData.data.NguoiDaiDien,
    });
  }


}
