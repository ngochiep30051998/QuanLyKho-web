import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = environment.api;
  constructor(
    public httpClient: HttpClient
  ) { }

  getAllStaff() {
    const url = `${this.api}employee/list-all-employee`;
    return this.httpClient.get(url);
  }

  createStaff(params) {
    const url = `${this.api}employee/add-new-employee`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  updateStaff(params) {
    const url = `${this.api}employee/update-employee`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  deleteStaff(params) {
    const url = `${this.api}employee/delete-employee`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: params
    };
    return new Promise((resolve, reject) => {
      this.httpClient.delete(url, httpOptions).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
}
