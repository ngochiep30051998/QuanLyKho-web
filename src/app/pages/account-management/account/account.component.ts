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
    this.initForm();
    if (this.dialogData.type === 'edit') {
      this.setFormData();
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.accountForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      IdRole: [3, Validators.required],
      EmployeeId: ['', Validators.required]
    });
    // this.addCheckboxes();
  }

  setFormData() {
    // this.addCheckboxes();
    const listRole = [];
    // console.log(this.dialogData.data.IdRole)
    this.roles.forEach((role, i) => {
      listRole[i] = this.dialogData.data.IdRole.findIndex(x => x === role.Id) > -1 ? true : false;
    });
    this.accountForm.patchValue({
      Username: this.dialogData.data.Username,
      Password: '',
      IdRole: listRole
    });
  }
  addCheckboxes() {
    this.roles.forEach(role => {
      const control = new FormControl(role.Id === 3);
      (this.accountForm.controls.IdRole as FormArray).push(control);
    });
  }

  async create() {
    // this.accountForm.value.IdRole = this.accountForm.value.IdRole.map((role, i) => {
    //   if (role) {
    //     return this.roles[i].Id;
    //   }
    // }).filter(x => x);
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
      const add = await this.authService.createUser(params);
      this.toastr.success('Thêm thành công');
      console.log(add);
      this.helperService.hideLoading();
      this.dialogRef.close();
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
}
