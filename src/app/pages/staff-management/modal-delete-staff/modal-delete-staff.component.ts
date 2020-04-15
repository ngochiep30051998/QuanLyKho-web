import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffComponent } from '../staff/staff.component';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-delete-staff',
  templateUrl: './modal-delete-staff.component.html',
  styleUrls: ['./modal-delete-staff.component.css']
})
export class ModalDeleteStaffComponent implements OnInit {
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public api: ApiService,
    private toastr: ToastrService,
  ) {
    console.log(dialogData);
  }

  ngOnInit() {
  }
  delete() {
    this.loading = true;
    const params = {
      employeeId: this.dialogData.data.Id
    };
    this.api.deleteStaff(params).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.toastr.success(res.message);
      this.dialogRef.close(params);
    }).catch(e => {
      console.log(e);
      this.toastr.error('Xoá thất bại');
      this.loading = false;
    });
  }
}
