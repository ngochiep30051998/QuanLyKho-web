import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IEmployee } from '../../interfaces/staffs.interface';
import { isEmpty } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: IEmployee = this.authService.getCurrentUser();
    if ( !isEmpty(user) && (user.RoleName === 'Admin' || user.RoleName === 'Employee')) {
      return true;
    }
    this.router.navigate(['dang-nhap']);
    return false;
  }

}
