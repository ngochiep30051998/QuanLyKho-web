import { Component, OnInit, ViewChild } from '@angular/core';
import { IProvider } from '../../interfaces/providers.interface';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ProviderComponent } from './provider/provider.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@Component({
  selector: 'app-provider-management',
  templateUrl: './provider-management.component.html',
  styleUrls: ['./provider-management.component.css']
})
export class ProviderManagementComponent implements OnInit {

  public displayedColumns: string[] = ['Ma', 'Ten', 'DiaChi', 'Email', 'NguoiDaiDien', 'SDT', 'action'];
  public dataSource = new MatTableDataSource<IProvider>(ELEMENT_DATA);
  public selection = new SelectionModel<IProvider>(true, []);
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
  showProviderDetail(type: string, provider?) {
    const data = {
      data: type === 'edit' ? provider : {} as IProvider,
      type
    };
    this.dialog.open(ProviderComponent, {
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

const ELEMENT_DATA: IProvider[] = [
  {
    Id: 1,
    Ma: 'group1',
    Ten: 'nhom 1',
    DiaChi: 'ha noi',
    Email: 'hiep@gmail.com',
    NguoiDaiDien: 'Nguyen Ngoc Hiep',
    SDT: '0968958647'
  },
  {
    Id: 2,
    Ma: 'group1',
    Ten: 'nhom 1',
    DiaChi: 'ha noi',
    Email: 'hiep@gmail.com',
    NguoiDaiDien: 'Nguyen Ngoc Hiep',
    SDT: '0968958647'
  },
  {
    Id: 3,
    Ma: 'group1',
    Ten: 'nhom 1',
    DiaChi: 'ha noi',
    Email: 'hiep@gmail.com',
    NguoiDaiDien: 'Nguyen Ngoc Hiep',
    SDT: '0968958647'
  },
];
