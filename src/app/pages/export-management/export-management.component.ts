import { Component, OnInit } from '@angular/core';
import { IExport } from '../../interfaces/bill.interface';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-export-management',
  templateUrl: './export-management.component.html',
  styleUrls: ['./export-management.component.css']
})
export class ExportManagementComponent implements OnInit {

  public displayedColumns: string[] = ['Ma', 'NgayXuat', 'DiaChi', 'TongTien', 'TenNhanVien', 'TenKho', 'action'];
  public listEmport: IExport[];
  public dataSource = new MatTableDataSource<IExport>();
  public selection = new SelectionModel<IExport>(true, []);
  public listGroup: IExport[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) {
    this.getAllExport();
  }

  ngOnInit() {
  }

  getAllExport() {
    this.helperService.showLoading();
    this.api.getAllExport().subscribe((res: any) => {
      this.listEmport = res.data;
      this.dataSource.data = this.listEmport;
      console.log(this.listEmport);
      this.helperService.hideLoading();
    }, err => {
      this.helperService.hideLoading();
    });
  }
  showBillDetail(type: string, billId?) {

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
