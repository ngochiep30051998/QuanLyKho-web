import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  public providerForm: FormGroup;
  public loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProviderComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
    private api: ApiService,
    private helperService: HelperService,
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

  async create() {
    try {
      this.helperService.markFormGroupTouched(this.providerForm);
      if (this.providerForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.providerForm.value.Ma,
        ten: this.providerForm.value.Ten,
        diaChi: this.providerForm.value.DiaChi,
        sdt: this.providerForm.value.SDT,
        email: this.providerForm.value.Email,
        nguoiDaiDien: this.providerForm.value.NguoiDaiDien
      };
      const res: any = await this.api.createProvider(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.providerForm.value;
      callBackData.Id = res.data.providerId;
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
    }
  }
  async update() {
    try {
      this.helperService.markFormGroupTouched(this.providerForm);
      if (this.providerForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.providerForm.value.Ma,
        ten: this.providerForm.value.Ten,
        diaChi: this.providerForm.value.DiaChi,
        sdt: this.providerForm.value.SDT,
        email: this.providerForm.value.Email,
        nguoiDaiDien: this.providerForm.value.NguoiDaiDien,
        providerId: this.dialogData.data.Id
      };
      const res: any = await this.api.updateProvider(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.providerForm.value;
      callBackData.Id = this.dialogData.data.Id;
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
    }
  }
  resetData() {
    this.dialogData.type === 'edit' ? this.setFormData() : this.providerForm.reset();
  }
}
