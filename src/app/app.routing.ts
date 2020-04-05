import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
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
        loadChildren: () => import('./pages/group-product-management/group-product-management.module').then(m => m.GroupProductManagementModule)
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
    ]
  },
  {
    path:'dang-nhap',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  }
];
