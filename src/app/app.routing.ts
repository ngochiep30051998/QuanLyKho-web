import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from './services/auth/auth.guard';
import { NgModule } from '@angular/core';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/quan-ly-vat-tu',
        pathMatch: 'full'
      },
      // {
      //   path: 'trang-chu',
      //   loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      // },
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
        path: 'phieu-nhap/:Id',
        loadChildren: () => import('./pages/import-bill/import-bill.module').then(m => m.ImportBillModule)
      },
      {
        path: 'phieu-nhap',
        loadChildren: () => import('./pages/import-bill/import-bill.module').then(m => m.ImportBillModule)
      },
      {
        path: 'phieu-xuat',
        loadChildren: () => import('./pages/export-bill/export-bill.module').then(m => m.ExportBillModule)
      },
      {
        path: 'phieu-xuat/:Id',
        loadChildren: () => import('./pages/export-bill/export-bill.module').then(m => m.ExportBillModule)
      },
      {
        path: 'thay-doi-mat-khau',
        loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      { path: '**', redirectTo: 'dang-nhap', pathMatch: 'full' },
    ]
  },
  {
    path: 'dang-nhap',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
];
@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
