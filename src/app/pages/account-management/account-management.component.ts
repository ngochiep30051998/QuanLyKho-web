import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser, IRole } from '../../interfaces/user.interface';
import { ModalDeleteUserComponent } from './modal-delete-user/modal-delete-user.component';
import { AccountComponent } from './account/account.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ROLES } from '../../constants/constants';
import { isEmpty } from 'lodash';
import { IStaff } from '../../interfaces/staffs.interface';
import { ApiService } from '../../services/api/api.service';
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  public displayedColumns: string[] = ['Id', 'Username', 'IdRole', 'CreatedAt', 'UpdatedAt', 'action'];
  public dataSource = new MatTableDataSource<any>();
  public selection = new SelectionModel<any>(true, []);
  public listStaff: IStaff[] = [];
  public roles = ROLES;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  showUserDetail(type: string, user?) {
    const data = {
      data: type === 'edit' ? user : {} as IUser,
      type,
      extendData: {
        listStaff: this.listStaff
      }
    };
    this.dialog.open(AccountComponent, {
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
    this.dialog.open(ModalDeleteUserComponent, {
      data: data,
      minWidth: 200,
      minHeight: 100
    });
  }

  getRoleName(idRole) {
    const role: IRole = this.roles.find(x => x.Id === idRole);
    return !isEmpty(role) ? role.Name : '';
  }

  getData() {
    this.apiService.getAllStaff().subscribe((res: any) => {
      this.listStaff = res.data;
    }, err => {
      console.log(err);
    });
  }
}
const ELEMENT_DATA = [
  { Id: 1, Username: 'ngochiep1', IdRole: [1, 2, 3], CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 2, Username: 'ngochiep2', IdRole: [2], CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
  { Id: 3, Username: 'ngochiep3', IdRole: [3], CreatedAt: '30/05/2020', UpdatedAt: '30/05/2020' },
];

