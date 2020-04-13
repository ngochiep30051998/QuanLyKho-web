import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public staffForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
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
    this.staffForm = this.fb.group({
      Ma: [''],
      Ten: [''],
      GioiTinh: [''],
      NgaySinh: [''],
      DiaChi: [''],
      CMND: [''],
      Email: [''],
      SDT: [''],
      NgayVaoLam: [''],
    });
  }

  setFormData() {
    this.staffForm.patchValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      GioiTinh: this.dialogData.data.GioiTinh,
      NgaySinh: new Date().toISOString(),
      DiaChi: this.dialogData.data.DiaChi,
      CMND: this.dialogData.data.CMND,
      Email: this.dialogData.data.Email,
      SDT: this.dialogData.data.SDT,
      NgayVaoLam: new Date().toISOString(),
    });

  }


}
