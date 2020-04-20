import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { IDiglogData } from '../../../interfaces/products.interface';
import { ApiService } from '../../../services/api/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-delete-warehouse',
  templateUrl: './modal-delete-warehouse.component.html',
  styleUrls: ['./modal-delete-warehouse.component.css']
})
export class ModalDeleteWarehouseComponent implements OnInit {

  public loading: boolean;
  constructor(
    public dialogRef: MatDialogRef<WarehouseComponent>,
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
      warehouseId: this.dialogData.data.Id
    };
    this.api.deleteWarehouse(params).then((res: any) => {
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
