import { Component, OnInit, ViewChild } from '@angular/core';
import { IExport } from '../../interfaces/bill.interface';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) {
    this.getAllExport();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
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
  showBillDetail(type: string, bill?: IExport) {
    if (bill) {
      this.router.navigate(['phieu-xuat/', bill.Id]);
    } else {
      this.router.navigate(['phieu-xuat']);
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
