import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ROLES } from '../../../constants/constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public accountForm: FormGroup;
  public roles = ROLES;
  constructor(
    public dialogRef: MatDialogRef<AccountComponent>,
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
    this.accountForm = this.fb.group({
      Username: [''],
      Password: [''],
      IdRole: new FormArray([])
    });
    this.addCheckboxes();
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

  create() {
    this.accountForm.value.IdRole = this.accountForm.value.IdRole.map((role, i) => {
      if (role) {
        return this.roles[i].Id;
      }
    }).filter(x => x);
    console.log(this.accountForm.value)
  }
}
