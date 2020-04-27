import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/trang-chu',
        pathMatch: 'full'
      },
      {
        path: 'trang-chu',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'quan-ly-tai-khoan',
        loadChildren: () => import('./pages/account-management/account-management.module').then(m => m.AccountManagementModule)
      },
      {
        path: 'quan-ly-nhom-vat-tu',
        loadChildren: () =>
          import('./pages/group-product-management/group-product-management.module').then(m => m.GroupProductManagementModule)
      },
      {
        path: 'quan-ly-vat-tu',
        loadChildren: () => import('./pages/product-management/product-management.module').then(m => m.ProductManagementModule)
      },
      {
        path: 'quan-ly-nha-cung-cap',
        loadChildren: () => import('./pages/provider-management/provider-management.module').then(m => m.ProviderManagementModule)
      },
      {
        path: 'quan-ly-nhan-vien',
        loadChildren: () => import('./pages/staff-management/staff-management.module').then(m => m.StaffManagementModule)
      },
      {
        path: 'quan-ly-kho',
        loadChildren: () => import('./pages/warehouse-management/warehouse-management.module').then(m => m.WarehouseManagementModule)
      },
      {
        path: 'quan-ly-nhap',
        loadChildren: () => import('./pages/import-management/import-management.module').then(m => m.ImportManagementModule)
      },
      {
        path: 'quan-ly-xuat',
        loadChildren: () => import('./pages/export-management/export-management.module').then(m => m.ExportManagementModule)
      },
      {
        path: 'them-phieu-xuat',
        loadChildren: () => import('./pages/import-bill/import-bill.module').then(m => m.ImportBillModule)
      },
      {
        path: 'phieu-xuat/:Id',
        loadChildren: () => import('./pages/import-bill/import-bill.module').then(m => m.ImportBillModule)
      }
    ]
  },
  {
    path: 'dang-nhap',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  }
];
