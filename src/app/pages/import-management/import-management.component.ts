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
  public displayedColumns: string[] = ['Ma', 'Ten', 'action'];
  public listGroupProduct: IImport[];
  public dataSource = new MatTableDataSource<IImport>();
  public selection = new SelectionModel<IImport>(true, []);
  public listGroup: IImport[] = [];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: ApiService,
    public helperService: HelperService
  ) { }

  ngOnInit() {
  }

}
