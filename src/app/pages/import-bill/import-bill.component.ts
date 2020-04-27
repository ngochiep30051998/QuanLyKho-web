import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';
import { IImportDetail } from '../../interfaces/bill.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProvider } from '../../interfaces/providers.interface';
import { IWarehouse } from '../../interfaces/warehouse.interface';
import { IStaff } from '../../interfaces/staffs.interface';
import { IProduct, IGroupProduct } from '../../interfaces/products.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-bill',
  templateUrl: './import-bill.component.html',
  styleUrls: ['./import-bill.component.css']
})
export class ImportBillComponent implements OnInit {
  public importDetail: IImportDetail;
  public importForm: FormGroup;
  public listProvider: IProvider[] = [];
  public listWarehouse: IWarehouse[] = [];
  public listStaff: IStaff[] = [];
  public displayedColumns: string[] = [
    'Ma', 'Ten', 'DonGia', 'DonGiaNhap', 'TenNhomVatTu', 'TenNhaCungCap', 'SoLuong', 'action'
  ];
  public dataSource = new MatTableDataSource<IProduct>();
  public selection = new SelectionModel<IProduct>(true, []);
  public filterParams = {
    q: '',
    NhaCungCap: '',
    NhomVatTu: ''
  };
  public listProduct: IProduct[] = [];
  public listGroupProduct: IGroupProduct[] = [];
  public listProductSearch: IProduct[] = [];
  public products: IProduct[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.initForm();

  }

  ngOnInit() {
    this.api.getAllProduct().subscribe((res: any) => {
      this.products = res.data;
    }, err => {
      this.products = [];
    });
  }

  initForm() {
    this.importForm = this.fb.group({
      Ma: ['', Validators.required],
      NgayNhap: [''],
      TongTien: [0],
      GhiChu: [''],
      IdNhanVien: [''],
      IdNhaCungCap: [''],
      IdKho: [''],
    });
  }
  applyFilter($event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.listProductSearch = this.products.filter(x => x.Ten.toLowerCase().includes(filterValue));
  }
  selectProduct(product: IProduct) {
    if (product.SoLuong === 0) {
      this.toastr.error('Vật liệu đã hết');
      return;
    }
    const index = this.listProduct.findIndex(x => x.Id === product.Id);
    if (index > -1) {
      this.toastr.error('Vật liệu đã có trong phiếu');
    } else {
      const p = product;
      p.SoLuong = 1;
      this.listProduct.push(p);
      this.toastr.success(`Thêm thành công : ${product.Ten}`);
    }
    this.dataSource.data = this.listProduct;
  }
}
