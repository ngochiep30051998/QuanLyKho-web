import { Component, OnInit } from '@angular/core';
import { IExportDetail, IProductDetail } from '../../interfaces/bill.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProvider } from '../../interfaces/providers.interface';
import { IWarehouse } from '../../interfaces/warehouse.interface';
import { IStaff } from '../../interfaces/staffs.interface';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { IProduct, IGroupProduct } from '../../interfaces/products.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { HelperService } from '../../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

export { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-bill',
  templateUrl: './export-bill.component.html',
  styleUrls: ['./export-bill.component.css']
})
export class ExportBillComponent implements OnInit {
  public exportDetail: IExportDetail;
  public exportForm: FormGroup;
  public listProvider: IProvider[] = [];
  public listWarehouse: IWarehouse[] = [];
  public listStaff: IStaff[] = [];
  public displayedColumns: string[] = [
    'Ma', 'Ten', 'DonGia', 'DonGiaNhap', 'TenNhomVatTu', 'SoLuong', 'GhiChu', 'action'
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
  public notes: any = {};
  public totalPrice = 0;
  public pageType = 'create';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initForm();
    this.activatedRoute.paramMap.subscribe(async (res: any) => {
      this.helperService.showLoading();
      await this.getAllData();
      if (res.params.Id) {
        this.pageType = 'update';
        this.api.getExportBillDetail(res.params.Id).subscribe((data: any) => {
          this.exportDetail = data.data;
          console.log(this.exportDetail);
          this.initData();
          this.helperService.hideLoading();
        }, err => {
          this.helperService.hideLoading();
        });
      } else {
        this.pageType = 'create';
        this.helperService.hideLoading();
      }
    }, errr => {
      this.helperService.hideLoading();
    });
  }

  ngOnInit() {

  }

  initForm() {
    this.exportForm = this.fb.group({
      Ma: ['', Validators.required],
      NgayXuat: [''],
      DiaChi: [''],
      TongTien: [0],
      GhiChu: [''],
      IdNhanVien: [''],
      IdKho: [''],
    });
  }

  initData() {
    try {
      this.exportForm.patchValue({
        Ma: this.exportDetail.Ma,
        NgayXuat: new Date(this.exportDetail.NgayXuat),
        TongTien: this.exportDetail.TongTien,
        DiaChi: this.exportDetail.DiaChi,
        GhiChu: this.exportDetail.GhiChu,
        IdNhanVien: this.exportDetail.IdNhanVien,
        IdKho: this.exportDetail.IdKho,
      });
      if (this.exportDetail.DanhSachVatTu) {
        this.exportDetail.DanhSachVatTu.forEach((prod: IProductDetail) => {
          const product = this.products.find(x => x.Id === prod.IdVatTu);
          if (product) {
            this.listProduct.push({ ...product, ...prod });
          }
        });
      }
      this.dataSource.data = this.listProduct;
    } catch (e) {
      console.log(e);
      this.helperService.hideLoading();
    }
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
      this.toastr.error('Vật liệu đã có trong phiếu', 'Thêm thất bại');
    } else {
      const p = product;
      p.SoLuong = 1;
      this.listProduct.push(p);
      this.toastr.success(`Bạn đã thêm thành công : ${product.Ten}`, 'Thêm thành công');
    }
    this.dataSource.data = this.listProduct;
  }
  remove(index, product: IProduct) {
    this.listProduct.splice(index, 1);
    this.dataSource.data = this.listProduct;
    this.toastr.success(`Bạn đã xoá : ${product.Ten}`, 'Xoá thành công');
  }
  getAllData() {
    const product = this.api.getAllProduct();
    const provider = this.api.getAllProvider();
    const warehouse = this.api.getAllWarehouse();
    const staff = this.api.getAllStaff();
    return new Promise((resovle, reject) => {
      forkJoin([product, provider, warehouse, staff]).subscribe((res: any) => {
        this.products = res[0].data;
        this.listProvider = res[1].data;
        this.listWarehouse = res[2].data;
        this.listStaff = res[3].data;
        resovle(res);
      }, err => {
        reject(err);
      });
    });

  }
  async createExport() {
    try {
      this.helperService.markFormGroupTouched(this.exportForm);
      if (this.exportForm.invalid) {
        return;
      }
      const params = {
        Ma: this.exportForm.value.Ma,
        NgayXuat: new Date(this.exportForm.value.NgayXuat),
        IdNhanVien: this.exportForm.value.IdNhanVien,
        IdKho: this.exportForm.value.IdKho,
        GhiChu: this.exportForm.value.GhiChu,
        DiaChi: this.exportForm.value.DiaChi,
        listProduct: this.dataSource.data.map(x => {
          const product = {
            Id: x.Id,
            SoLuong: x.SoLuong,
            GhiChu: x.GhiChu
          };
          return product;
        })
      };
      console.log(params);

      this.helperService.showLoading();
      const res = await this.api.createExport(params);
      console.log(res);
      this.helperService.hideLoading();
      this.toastr.success('Thêm thành công');
    } catch (e) {
      console.log(e);
      this.toastr.error('Thêm thất bại');
      this.helperService.hideLoading();
    }
  }

  async updateExport() {
    try {
      this.helperService.markFormGroupTouched(this.exportForm);
      if (this.exportForm.invalid) {
        return;
      }
      const params = {
        Id: this.exportDetail.Id,
        Ma: this.exportForm.value.Ma,
        NgayXuat: new Date(this.exportForm.value.NgayXuat),
        IdNhanVien: this.exportForm.value.IdNhanVien,
        IdKho: this.exportForm.value.IdKho,
        GhiChu: this.exportForm.value.GhiChu,
        DiaChi: this.exportForm.value.DiaChi,
        listProduct: this.dataSource.data.map(x => {
          const product = {
            Id: x.Id,
            SoLuong: x.SoLuong,
            GhiChu: x.GhiChu
          };
          return product;
        })
      };
      console.log(params);

      this.helperService.showLoading();
      const res = await this.api.updateExport(params);
      console.log(res);
      this.helperService.hideLoading();
      this.toastr.success('Sửa thành công');
    } catch (e) {
      console.log(e);
      this.toastr.error('Sửa thất bại');
      this.helperService.hideLoading();
    }
  }

  getTotalPrice() {
    // this.totalPrice = 0;
    let total = 0;
    for (const product of this.listProduct) {
      total += product.SoLuong * product.DonGia;
    }
    return total;
  }

}
