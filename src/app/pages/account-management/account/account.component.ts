import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ROLES } from '../../../constants/constants';
import { IStaff } from '../../../interfaces/staffs.interface';
import { HelperService } from '../../../services/helper/helper.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public accountForm: FormGroup;
  public roles = ROLES;
  public listStaff: IStaff[] = [];
  constructor(
    public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
    public helperService: HelperService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    console.log(this.dialogData);
    // this.dialogRef.getState()
    this.listStaff = this.dialogData.extendData.listStaff;
    if (this.dialogData.type === 'edit') {
      this.initFormUpdatePassword();
      this.setFormData();
    } else {
      this.initFormCreate();
    }
  }

  ngOnInit() {
  }

  initFormCreate() {
    this.accountForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      IdRole: [2, Validators.required],
      EmployeeId: ['', Validators.required]
    });
    // this.addCheckboxes();
  }
  initFormUpdatePassword() {
    this.accountForm = this.fb.group({
      Username: ['', Validators.required],
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      EmployeeId: ['', Validators.required]
    });
  }
  setFormData() {
    this.accountForm.patchValue({
      Username: this.dialogData.data.Username,
      Password: '',
      EmployeeId: this.dialogData.data.EmployeeId
    });
  }

  async create() {
    try {
      console.log(this.accountForm.value);
      this.helperService.markFormGroupTouched(this.accountForm);
      if (this.accountForm.invalid) {
        return;
      }
      this.helperService.showLoading();
      const params = {
        username: this.accountForm.value.Username,
        password: this.accountForm.value.Password,
        confirmPassword: this.accountForm.value.ConfirmPassword,
        employeeId: this.accountForm.value.EmployeeId,
        roleId: this.accountForm.value.IdRole
      };
      const res: any = await this.authService.createUser(params);
      this.toastr.success('Thêm thành công');
      console.log(res);
      this.helperService.hideLoading();
      this.toastr.success(res.message);
      const callBackData = {
        EmployeeId: res.employee.NhanVienId,
        EmployeeName: res.employee.TenNhanVien,
        Id: res.employee.UserId,
        IdRole: this.accountForm.value.IdRole,
        RoleName: res.employee.RoleName,
        Username: this.accountForm.value.Username,
      };
      // callBackData.Id = res.UserId;
      this.dialogRef.close(callBackData);
    } catch (e) {
      console.log(e);
      if (e.error && e.error.errorArr) {
        let mess = '';
        for (const err of e.error.errorArr) {
          mess += '\n' + err;
        }
        this.toastr.error(mess, 'Thêm thất bại');
      }
      this.helperService.hideLoading();
    }

  }
  async update() {
    try {
      console.log(this.accountForm.value);
      this.helperService.markFormGroupTouched(this.accountForm);
      if (this.accountForm.invalid) {
        return;
      }
      this.helperService.showLoading();
      const params = {
        oldPassword: this.accountForm.value.OldPassword,
        newPassword: this.accountForm.value.NewPassword,
        confirmPassword: this.accountForm.value.ConfirmPassword,
        employeeId: this.accountForm.value.EmployeeId,
      };
      const res: any = await this.authService.updatePassword(params);
      this.toastr.success('Thêm thành công');
      console.log(res);
      this.helperService.hideLoading();
      this.toastr.success(res.message);
      const callBackData = {
        EmployeeId: this.accountForm.value.EmployeeId,
        EmployeeName: this.dialogData.data.EmployeeName,
        Id: this.dialogData.data.Id,
        IdRole: this.dialogData.data.IdRole,
        RoleName: this.dialogData.data.RoleName,
        Username: this.dialogData.data.Username,
      };
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.helperService.hideLoading();
    }
  }
}
