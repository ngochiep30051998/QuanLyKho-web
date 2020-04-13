import { Component, OnInit, ViewChild } from '@angular/core';
import { IStaff } from '../../interfaces/staffs.interface';
import { StaffComponent } from './staff/staff.component';
import { ModalDeleteStaffComponent } from './modal-delete-staff/modal-delete-staff.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit {
  public displayedColumns: string[] = [
    'Ma', 'Ten', 'GioiTinh', 'NgaySinh', 'DiaChi', 'CMND', 'SDT', 'Email', 'NgayVaoLam', 'action'
  ];
  public dataSource = new MatTableDataSource<IStaff>(ELEMENT_DATA);
  public selection = new SelectionModel<IStaff>(true, []);
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
  showStaffDetail(type: string, groupProduct?) {
    const data = {
      data: type === 'edit' ? groupProduct : {} as IStaff,
      type
    };
    this.dialog.open(StaffComponent, {
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
    this.dialog.open(ModalDeleteStaffComponent, {
      data: data,
      minWidth: 200,
      minHeight: 100
    });
  }
}

const ELEMENT_DATA: IStaff[] = [
  {
    Id: 1,
    Ma: 'group1',
    Ten: 'nhom 1',
    GioiTinh: true,
    NgaySinh: '30/05/1998',
    DiaChi: 'Ha Noi',
    CMND: '123456789',
    Email: 'ngochiep@gmail.com',
    SDT: '0912312313',
    NgayVaoLam: '30/05/2018',
    CreatedAt: '30/05/2020',
    UpdatedAt: '30/05/2020'
  },
  {
    Id: 2,
    Ma: 'group1',
    Ten: 'nhom 1',
    GioiTinh: true,
    NgaySinh: '30/05/1998',
    DiaChi: 'Ha Noi',
    CMND: '123456789',
    Email: 'ngochiep@gmail.com',
    SDT: '0912312313',
    NgayVaoLam: '30/05/2018',
    CreatedAt: '30/05/2020',
    UpdatedAt: '30/05/2020'
  },
  {
    Id: 3,
    Ma: 'group1',
    Ten: 'nhom 1',
    GioiTinh: true,
    NgaySinh: '30/05/1998',
    DiaChi: 'Ha Noi',
    CMND: '123456789',
    Email: 'ngochiep@gmail.com',
    SDT: '0912312313',
    NgayVaoLam: '30/05/2018',
    CreatedAt: '30/05/2020',
    UpdatedAt: '30/05/2020'
  },
];
