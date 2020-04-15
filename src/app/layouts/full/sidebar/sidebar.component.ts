import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../../services/auth/auth.service';
import { IEmployee } from '../../../interfaces/staffs.interface';
import { isEmpty } from 'lodash';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMSADMIN = [
  { state: 'trang-chu', name: 'Trang chủ', type: 'link', icon: 'av_timer' },
  { state: 'quan-ly-vat-tu', type: 'link', name: 'Quản lý vật tư', icon: 'crop_7_5' },
  { state: 'quan-ly-nhom-vat-tu', type: 'link', name: 'Quản lý nhóm vật tư', icon: 'view_comfy' },
  { state: 'quan-ly-tai-khoan', type: 'link', name: 'Quản lý tải khoản', icon: 'view_list' },
  { state: 'quan-ly-nha-cung-cap', type: 'link', name: 'QUản lý nhà cung cấp', icon: 'view_headline' },
  { state: 'quan-ly-nhan-vien', type: 'link', name: 'Quản lý nhân viên', icon: 'tab' },

];

const MENUITEMS = [
  { state: 'trang-chu', name: 'Trang chủ', type: 'link', icon: 'av_timer' },
  { state: 'quan-ly-vat-tu', type: 'link', name: 'Quản lý vật tư', icon: 'crop_7_5' },
  { state: 'quan-ly-nhom-vat-tu', type: 'link', name: 'Quản lý nhóm vật tư', icon: 'view_comfy' },
  { state: 'quan-ly-nha-cung-cap', type: 'link', name: 'QUản lý nhà cung cấp', icon: 'view_headline' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  menuItems: Menu[];
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService
  ) {
    const user: IEmployee = this.authService.getCurrentUser();
    this.menuItems = !isEmpty(user) && user.RoleName === 'Admin' ? MENUITEMSADMIN : MENUITEMS;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
