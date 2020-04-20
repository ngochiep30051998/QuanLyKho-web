import { Component, OnInit, ViewChild } from '@angular/core';
import { isEmpty } from 'lodash';
import { ModalDeleteWarehouseComponent } from './modal-delete-warehouse/modal-delete-warehouse.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { IWarehouse } from '../../interfaces/warehouse.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';
import { IStaff } from '../../interfaces/staffs.interface';

@Component({
  selector: 'app-warehouse-management',
  templateUrl: './warehouse-management.component.html',
  styleUrls: ['./warehouse-management.component.css']
})
export class WarehouseManagementComponent implements OnInit {

  public displayedColumns: string[] = [
    'Ma', 'Ten', 'DiaChi', 'SDT', 'GhiChu', 'TenQuanLy', 'action'
  ];
  public listManager: IStaff[] = [];
  public listWarehouse: IWarehouse[] = [];
  public dataSource = new MatTableDataSource<IWarehouse>();
  public selection = new SelectionModel<IWarehouse>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) {
    this.getAllWarehouse();
    this.getAllStaff();
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showDetail(type: string, staff?) {
    const data = {
      data: type === 'edit' ? staff : {} as IWarehouse,
      type,
      extendData: this.listManager
    };
    this.dialog.open(WarehouseComponent, {
      data: data,
      minWidth: 500,
      minHeight: 200
    }).afterClosed().subscribe(res => {
      console.log(res);
      if (!isEmpty(res)) {
        console.log(res);
        const index = this.listWarehouse.findIndex(x => x.Id === res.Id);
        if (index > -1) {
          this.listWarehouse[index] = res;
        } else {
          this.listWarehouse.push(res);
        }
        this.dataSource.data = this.listWarehouse;
      }
    }, err => {
      console.log(err);
    });
  }
  showModalDelete(groupProduct) {
    const data = {
      data: groupProduct,
      type: ''
    };
    this.dialog.open(ModalDeleteWarehouseComponent, {
      data: data,
      minWidth: 200,
      minHeight: 100
    }).afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
        const index = this.listWarehouse.findIndex(x => x.Id === res.Id);
        this.listWarehouse.splice(index, 1);
        this.dataSource.data = this.listWarehouse;
      }
    });
  }
  getAllWarehouse() {
    this.helperService.showLoading();
    this.api.getAllWarehouse().subscribe((res: any) => {
      this.listWarehouse = res.data;
      this.dataSource.data = this.listWarehouse;
      this.helperService.hideLoading();
    }, err => {
      this.helperService.hideLoading();
      console.log(err);
    });
  }
  getAllStaff() {
    this.api.getAllStaff().subscribe((res: any) => {
      this.listManager = res.data;
    }, err => {
      console.log(err);
    });
  }
}
