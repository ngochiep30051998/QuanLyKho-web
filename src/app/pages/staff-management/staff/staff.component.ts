import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { HelperService } from '../../../services/helper/helper.service';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  public staffForm: FormGroup;
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
    public helperService: HelperService,
    private api: ApiService,
    private toastr: ToastrService,
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
      Ma: ['', Validators.required],
      Ten: ['', Validators.required],
      GioiTinh: [''],
      NgaySinh: [''],
      DiaChi: [''],
      CMND: [''],
      Email: ['', Validators.email],
      SDT: [''],
      NgayVaoLam: [''],
    });
  }

  setFormData() {
    this.staffForm.patchValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      GioiTinh: this.dialogData.data.GioiTinh,
      NgaySinh: new Date(this.dialogData.data.NgaySinh).toISOString(),
      DiaChi: this.dialogData.data.DiaChi,
      CMND: this.dialogData.data.CMND,
      Email: this.dialogData.data.Email,
      SDT: this.dialogData.data.SDT,
      NgayVaoLam: new Date(this.dialogData.data.NgayVaoLam).toISOString(),
    });
  }
  async create() {
    try {
      this.helperService.markFormGroupTouched(this.staffForm);
      if (this.staffForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.staffForm.value.Ma,
        ten: this.staffForm.value.Ten,
        gioiTinh: this.staffForm.value.GioiTinh,
        ngaySinh: this.staffForm.value.NgaySinh || new Date(),
        diaChi: this.staffForm.value.DiaChi,
        CMND: this.staffForm.value.CMND,
        SDT: this.staffForm.value.SDT,
        email: this.staffForm.value.Email,
        ngayVaoLam: this.staffForm.value.NgayVaoLam || new Date()
      };
      const res: any = await this.api.createStaff(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.staffForm.value;
      callBackData.Id = res.employeeId;
      this.dialogRef.close(callBackData);
      console.log(res);
    } catch (e) {
      this.loading = false;
      this.toastr.error('Tạo nhân viên thất bại');
      console.log(e);
    }
  }

  async update() {
    try {
      this.helperService.markFormGroupTouched(this.staffForm);
      if (this.staffForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.staffForm.value.Ma,
        ten: this.staffForm.value.Ten,
        gioiTinh: this.staffForm.value.GioiTinh,
        ngaySinh: this.staffForm.value.NgaySinh,
        diaChi: this.staffForm.value.DiaChi,
        CMND: this.staffForm.value.CMND,
        SDT: this.staffForm.value.SDT,
        email: this.staffForm.value.Email,
        ngayVaoLam: this.staffForm.value.NgayVaoLam,
        employeeId: this.dialogData.data.Id
      };
      const res: any = await this.api.updateStaff(params);
      this.toastr.success(res.message);
      this.loading = false;
      const callBackData = this.staffForm.value;
      callBackData.Id = this.dialogData.data.Id;
      this.dialogRef.close(callBackData);
      console.log(res);
    } catch (e) {
      this.toastr.error('Cập nhật nhân viên thất bại');
      this.loading = false;
      console.log(e);
    }
  }
  resetData() {
    this.dialogData.type === 'edit' ? this.setFormData() : this.staffForm.reset();
  }
}
