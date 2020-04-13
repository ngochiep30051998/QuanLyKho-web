import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StaffComponent } from '../staff/staff.component';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-modal-delete-staff',
  templateUrl: './modal-delete-staff.component.html',
  styleUrls: ['./modal-delete-staff.component.css']
})
export class ModalDeleteStaffComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
  ) {
    console.log(dialogData);
   }

  ngOnInit() {
  }
}
