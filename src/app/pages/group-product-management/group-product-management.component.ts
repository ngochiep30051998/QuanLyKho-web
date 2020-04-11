import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IGroupProduct } from '../../interfaces/products.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { GroupProductComponent } from './group-product/group-product.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@Component({
  selector: 'app-group-product-management',
  templateUrl: './group-product-management.component.html',
  styleUrls: ['./group-product-management.component.css']
})
export class GroupProductManagementComponent implements OnInit {

  public displayedColumns: string[] = ['Ma', 'Ten', 'CreatedAt', 'UpdatedAt','action'];
  public dataSource = new MatTableDataSource<IGroupProduct>(ELEMENT_DATA);
  public selection = new SelectionModel<IGroupProduct>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }
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
    });
  }
}

const ELEMENT_DATA: IGroupProduct[] = [
  { Id: 1, Ma: 'group1', Ten: 'nhom 1', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 2, Ma: 'group2', Ten: 'nhom 2', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 3, Ma: 'group3', Ten: 'nhom 3', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 4, Ma: 'group4', Ten: 'nhom 4', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 5, Ma: 'group5', Ten: 'nhom 5', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 6, Ma: 'group6', Ten: 'nhom 6', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 7, Ma: 'group7', Ten: 'nhom 7', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 8, Ma: 'group8', Ten: 'nhom 8', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 9, Ma: 'group9', Ten: 'nhom 9', CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
];
