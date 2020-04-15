import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IEmployee } from '../../interfaces/staffs.interface';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }
  login(params) {
    const url = `${this.api}auth/login`;
    return new Promise((resolve, reject) => {
      return this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['dang-nhap']);
  }
  getCurrentUser(): IEmployee {
    const token = localStorage.getItem('accessToken');
    const decode = token ? jwt_decode(localStorage.getItem('accessToken')) : null;
    return decode ? decode.data : null;
  }

  getRefreshToken(params) {
    const url = `${this.api}auth/refresh-token`;
    return this.httpClient.post(url, params);
  }
}
