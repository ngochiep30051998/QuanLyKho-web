import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { IProduct } from '../../interfaces/products.interface';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  public displayedColumns: string[] = ['select', 'Ma', 'Ten', 'DonGia', 'NhomVatTu', 'NhaCungCap', 'DonViTinh', 'SoLuong', 'action'];
  public dataSource = new MatTableDataSource<IProduct>(ELEMENT_DATA);
  public selection = new SelectionModel<IProduct>(true, []);
  public filterParams = {
    q: '',
    NhaCungCap: '',
    NhomVatTu: ''
  };
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

  showProductDetail(type: string, product?) {
    const data = {
      data: type === 'edit' ? product : {} as IProduct,
      type
    };
    this.dialog.open(ProductComponent, {
      data: data,
      minWidth: 500,
      minHeight: 200
    });
  }
  showModalDelete(product) {
    const data = {
      data: product,
      type: ''
    };
    this.dialog.open(ModalDeleteComponent, {
      data: data,
      minWidth: 200,
      minHeight: 100
    });
  }
  applyFilter(event: Event) {
    if (this.filterParams.NhomVatTu) {
      this.dataSource.data = this.dataSource.data.filter(
        x => x.NhomVatTu === this.filterParams.NhomVatTu
      );
    }
    if (this.filterParams.NhaCungCap) {
      this.dataSource.data = this.dataSource.data.filter(
        x => x.NhaCungCap === this.filterParams.NhaCungCap
      );
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProduct): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Ma + 1}`;
  }
}

const ELEMENT_DATA: IProduct[] = [
  { Ma: '1234', Ten: 'Vật tư 1', DonGia: 1000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 1 },
  { Ma: '1235', Ten: 'Vật tư 1', DonGia: 20000000, NhomVatTu: 'L', NhaCungCap: 'I', DonViTinh: 'chiếc', SoLuong: 2 },
  { Ma: '1234', Ten: 'Vật tư 1', DonGia: 30000000, NhomVatTu: 'O', NhaCungCap: 'K', DonViTinh: 'chiếc', SoLuong: 3 },
  { Ma: '1232', Ten: 'Vật tư 1', DonGia: 410000000, NhomVatTu: 'HM', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 4 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 150000000, NhomVatTu: 'N', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 5 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 106000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 6 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'cái', SoLuong: 7 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10066700000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 8 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000067600, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 9 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 1000000670, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 100000007, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 11 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 100000080, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 12 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 1000000340, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 13 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 1000003400, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 14 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 15 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 20 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 25 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },
  { Ma: '123', Ten: 'Vật tư 1', DonGia: 10000000, NhomVatTu: 'H', NhaCungCap: 'H', DonViTinh: 'chiếc', SoLuong: 10 },

];
