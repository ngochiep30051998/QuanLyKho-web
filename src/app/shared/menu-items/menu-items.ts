import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'trang-chu', name: 'Trang chủ', type: 'link', icon: 'av_timer' },
  { state: 'quan-ly-vat-tu', type: 'link', name: 'Quản lý vật tư', icon: 'crop_7_5' },
  { state: 'quan-ly-nhom-vat-tu', type: 'link', name: 'Quản lý nhóm vật tư', icon: 'view_comfy' },
  { state: 'quan-ly-tai-khoan', type: 'link', name: 'Quản lý tải khoản', icon: 'view_list' },
  { state: 'quan-ly-nha-cung-cap', type: 'link', name: 'QUản lý nhà cung cấp', icon: 'view_headline' },
  { state: 'quan-ly-nhan-vien', type: 'link', name: 'Quản lý nhân viên', icon: 'tab' },

];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
