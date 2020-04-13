import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AccountComponent } from '../account/account.component';
import { IDiglogData } from '../../../interfaces/products.interface';

@Component({
  selector: 'app-modal-delete-user',
  templateUrl: './modal-delete-user.component.html',
  styleUrls: ['./modal-delete-user.component.css']
})
export class ModalDeleteUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AccountComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
  ) {
    console.log(dialogData);
   }

  ngOnInit() {
  }

}
