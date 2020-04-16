import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group-product',
  templateUrl: './group-product.component.html',
  styleUrls: ['./group-product.component.css']
})
export class GroupProductComponent implements OnInit {

  public groupProductForm: FormGroup;
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<GroupProductComponent>,
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
    this.groupProductForm = this.fb.group({
      Ma: ['', Validators.required],
      Ten: ['', Validators.required],
    });
  }

  setFormData() {
    this.groupProductForm.setValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
    });
  }

  async create() {
    try {
      this.helperService.markFormGroupTouched(this.groupProductForm);
      if (this.groupProductForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.groupProductForm.value.Ma,
        ten: this.groupProductForm.value.Ten
      };
      const res: any = await this.api.createGroupProduct(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.groupProductForm.value;
      callBackData.Id = res.data.categoryId;
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
    }
  }
  async update() {
    try {
      this.helperService.markFormGroupTouched(this.groupProductForm);
      if (this.groupProductForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.groupProductForm.value.Ma,
        ten: this.groupProductForm.value.Ten,
        categoryId: this.dialogData.data.Id
      };
      const res: any = await this.api.updateGroupProduct(params);
      this.loading = false;
      this.toastr.success(res.message);
      const callBackData = this.groupProductForm.value;
      callBackData.Id = this.dialogData.data.Id;
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
    }
  }
  resetData() {
    this.dialogData.type === 'edit' ? this.setFormData() : this.groupProductForm.reset();
  }
}
