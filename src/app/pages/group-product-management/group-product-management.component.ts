import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IGroupProduct } from '../../interfaces/products.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { GroupProductComponent } from './group-product/group-product.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-group-product-management',
  templateUrl: './group-product-management.component.html',
  styleUrls: ['./group-product-management.component.css']
})
export class GroupProductManagementComponent implements OnInit {

  public displayedColumns: string[] = ['Ma', 'Ten', 'action'];
  public listGroupProduct: IGroupProduct[];
  public dataSource = new MatTableDataSource<IGroupProduct>();
  public selection = new SelectionModel<IGroupProduct>(true, []);
  public listGroup: IGroupProduct[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) { 
    this.getAllProduct();
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showGroupProductDetail(type: string, groupProduct?) {
    const data = {
      data: type === 'edit' ? groupProduct : {} as IGroupProduct,
      type
    };
    this.dialog.open(GroupProductComponent, {
      data: data,
      minWidth: 500,
      minHeight: 200
    }).afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log(res);
        const index = this.listGroup.findIndex(x => x.Id === res.Id);
        if (index > -1) {
          this.listGroup[index] = res;
        } else {
          this.listGroup.push(res);
        }
        this.dataSource.data = this.listGroup;
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
    this.dialog.open(ModalDeleteComponent, {
      data: data,
      minWidth: 200,
      minHeight: 100
    }).afterClosed().subscribe((res) => {
      if (res) {
        const index = this.listGroup.findIndex(x => x.Id === res.Id);
        this.listGroup.splice(index, 1);
        this.dataSource.data = this.listGroup;
      }
    });
  }
  getAllProduct() {
    this.helperService.showLoading();
    this.api.getAllGroupProduct().subscribe((res: any) => {
      this.dataSource.data = res.data;
      this.listGroup = res.data;
      this.helperService.hideLoading();
    }, err => {
      this.helperService.hideLoading();
      console.log(err);
    });
  }
}

// const ELEMENT_DATA: IGroupProduct[] = [
//   { Id: 1, Ma: 'group1', Ten: 'nhom 1', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 2, Ma: 'group2', Ten: 'nhom 2', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 3, Ma: 'group3', Ten: 'nhom 3', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 4, Ma: 'group4', Ten: 'nhom 4', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 5, Ma: 'group5', Ten: 'nhom 5', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 6, Ma: 'group6', Ten: 'nhom 6', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 7, Ma: 'group7', Ten: 'nhom 7', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 8, Ma: 'group8', Ten: 'nhom 8', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
//   { Id: 9, Ma: 'group9', Ten: 'nhom 9', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
// ];
