import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductComponent } from '../product/product.component';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    private api: ApiService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
  }
  delete() {
    this.loading = true;
    const params = {
      productId: this.dialogData.data.Id
    };
    this.api.deleteProduct(params).then((res: any) => {
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
