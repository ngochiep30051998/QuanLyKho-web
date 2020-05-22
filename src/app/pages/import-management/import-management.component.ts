import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';
import { IImport } from '../../interfaces/bill.interface';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-import-management',
  templateUrl: './import-management.component.html',
  styleUrls: ['./import-management.component.css']
})
export class ImportManagementComponent implements OnInit {
  public displayedColumns: string[] = ['Ma', 'NgayNhap', 'TongTien', 'GhiChu', 'TenNhanVien', 'TenNhaCungCap', 'TenKho', 'action'];
  public listImport: IImport[];
  public dataSource = new MatTableDataSource<IImport>();
  public selection = new SelectionModel<IImport>(true, []);
  public listGroup: IImport[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) {
    this.getAllImport();
  }

  ngOnInit() {
  }

  getAllImport() {
    this.helperService.showLoading();
    this.api.getAllImport().subscribe((res: any) => {
      this.listImport = res.data;
      this.dataSource.data = this.listImport;
      console.log(this.listImport);
      this.helperService.hideLoading();
    }, err => {
      this.helperService.hideLoading();
    });
  }
  showBillDetail(type: string, bill?: IImport) {
    if (bill) {
      this.router.navigate(['phieu-nhap/', bill.Id]);
    } else {
      this.router.navigate(['phieu-nhap']);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
