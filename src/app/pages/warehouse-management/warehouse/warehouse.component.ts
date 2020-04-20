import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { HelperService } from '../../../services/helper/helper.service';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';
import { IStaff } from '../../../interfaces/staffs.interface';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  public warehauseForm: FormGroup;
  public listManager: IStaff[] = [];
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<WarehouseComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
    public helperService: HelperService,
    private api: ApiService,
    private toastr: ToastrService,
  ) {
    console.log(this.dialogData);
    this.listManager = this.dialogData.extendData;
    // this.dialogRef.getState()
    this.initForm();
    if (this.dialogData.type === 'edit') {
      this.setFormData();
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.warehauseForm = this.fb.group({
      Ma: ['', Validators.required],
      Ten: ['', Validators.required],
      DiaChi: [''],
      SDT: [''],
      GhiChu: [''],
      IdQuanLy: [''],
    });
  }

  setFormData() {
    this.warehauseForm.patchValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      DiaChi: this.dialogData.data.DiaChi,
      SDT: this.dialogData.data.SDT,
      GhiChu: this.dialogData.data.GhiChu,
      IdQuanLy: this.dialogData.data.IdQuanLy,
    });
  }
  async create() {
    try {
      this.helperService.markFormGroupTouched(this.warehauseForm);
      if (this.warehauseForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.warehauseForm.value.Ma,
        ten: this.warehauseForm.value.Ten,
        diaChi: this.warehauseForm.value.DiaChi,
        sdt: this.warehauseForm.value.SDT,
        ghiChu: this.warehauseForm.value.GhiChu,
        idQuanLy: this.warehauseForm.value.IdQuanLy
      };
      const res: any = await this.api.createWarehouse(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.warehauseForm.value;
      callBackData.Id = res.warehouseId;
      const manager = this.listManager.find(x => x.Id === this.warehauseForm.value.IdQuanLy);
      callBackData.TenQuanLy = manager.Ten;
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
      this.helperService.markFormGroupTouched(this.warehauseForm);
      if (this.warehauseForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.warehauseForm.value.Ma,
        ten: this.warehauseForm.value.Ten,
        diaChi: this.warehauseForm.value.DiaChi,
        sdt: this.warehauseForm.value.SDT,
        ghiChu: this.warehauseForm.value.GhiChu,
        idQuanLy: this.warehauseForm.value.IdQuanLy,
        warehouseId: this.dialogData.data.Id
      };
      const res: any = await this.api.updateWarehouse(params);
      this.loading = false;
      const callBackData = this.warehauseForm.value;
      callBackData.Id = this.dialogData.data.Id;
      const manager = this.listManager.find(x => x.Id === this.warehauseForm.value.IdQuanLy);
      callBackData.TenQuanLy = manager.Ten;
      this.toastr.success(res.message);
      this.dialogRef.close(callBackData);
      console.log(res);
    } catch (e) {
      this.toastr.error('Cập nhật nhân viên thất bại');
      this.loading = false;
      console.log(e);
    }
  }
  resetData() {
    this.dialogData.type === 'edit' ? this.setFormData() : this.warehauseForm.reset();
  }

}
