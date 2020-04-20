import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduct, IDiglogData, IGroupProduct } from '../../../interfaces/products.interface';
import { IProvider } from '../../../interfaces/providers.interface';
import { ApiService } from '../../../services/api/api.service';
import { HelperService } from '../../../services/helper/helper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public productForm: FormGroup;
  public listGroupProduct: IGroupProduct[] = [];
  public listProvider: IProvider[] = [];
  public loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDiglogData,
    public fb: FormBuilder,
    private api: ApiService,
    private helperService: HelperService,
    private toastr: ToastrService,
  ) {
    console.log(this.dialogData);
    this.listGroupProduct = this.dialogData.extendData.listGroupProduct;
    this.listProvider = this.dialogData.extendData.listProvider;
    // this.dialogRef.getState()
    this.initForm();
    if (this.dialogData.type === 'edit') {
      this.setFormData();
    }
  }

  ngOnInit() {
  }

  initForm() {
    this.productForm = this.fb.group({
      Ma: ['', Validators.required],
      Ten: ['', Validators.required],
      DonGia: ['', Validators.required],
      DonGiaNhap: ['', Validators.required],
      IdNhomVatTu: [''],
      IdNhaCungCap: [''],
      DonViTinh: ['']
    });
  }

  setFormData() {
    this.productForm.setValue({
      Ma: this.dialogData.data.Ma,
      Ten: this.dialogData.data.Ten,
      DonGia: this.dialogData.data.DonGia,
      DonGiaNhap: this.dialogData.data.DonGiaNhap,
      IdNhomVatTu: this.dialogData.data.IdNhomVatTu,
      IdNhaCungCap: this.dialogData.data.IdNhaCungCap,
      DonViTinh: ''
    });
  }
  async create() {
    try {
      this.helperService.markFormGroupTouched(this.productForm);
      if (this.productForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.productForm.value.Ma,
        ten: this.productForm.value.Ten,
        donGia: this.productForm.value.DonGia,
        donGiaNhap: this.productForm.value.DonGiaNhap,
        donViTinh: this.productForm.value.DonViTinh,
        idNhomVatTu: this.productForm.value.IdNhomVatTu,
        idNhaCungCap: this.productForm.value.IdNhaCungCap,
      };
      const res: any = await this.api.createProduct(params);
      this.loading = false;
      this.toastr.success(res.message);
      const groupProd = this.listGroupProduct.find(x => x.Id === this.productForm.value.idNhaCungCap);
      const provider = this.listProvider.find(x => x.Id === this.productForm.value.idNhaCungCap);
      let callBackData = {
        Id: res.data.productId,
        TenNhaCungCap: provider.Ten,
        TenNhomVatTu: groupProd.Ten,
        SoLuong: 0
      };
      callBackData = { ...callBackData, ...this.productForm.value };
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
    }
  }
  async update() {
    try {
      this.helperService.markFormGroupTouched(this.productForm);
      if (this.productForm.invalid) {
        return;
      }
      this.loading = true;
      const params = {
        ma: this.productForm.value.Ma,
        ten: this.productForm.value.Ten,
        donGia: this.productForm.value.DonGia,
        donGiaNhap: this.productForm.value.DonGiaNhap,
        donViTinh: this.productForm.value.DonViTinh,
        idNhomVatTu: this.productForm.value.IdNhomVatTu,
        idNhaCungCap: this.productForm.value.IdNhaCungCap,
        productId: this.dialogData.data.Id
      };
      const res: any = await this.api.updateProduct(params);
      this.loading = false;
      this.toastr.success(res.message);
      const groupProd = this.listGroupProduct.find(x => x.Id === this.productForm.value.IdNhomVatTu);
      const provider = this.listProvider.find(x => x.Id === this.productForm.value.IdNhaCungCap);
      let callBackData = {
        Id: this.dialogData.data.Id,
        TenNhaCungCap: provider.Ten,
        TenNhomVatTu: groupProd.Ten,
        SoLuong: this.dialogData.data.SoLuong
      };
      callBackData = { ...callBackData, ...this.productForm.value };
      this.dialogRef.close(callBackData);
    } catch (e) {
      this.loading = false;
      console.log(e)
    }
  }
  resetData() {
    this.dialogData.type === 'edit' ? this.setFormData() : this.productForm.reset();
  }
}
