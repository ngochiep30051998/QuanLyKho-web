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

  getAllGroupProduct(){
    const url = `${this.api}category/list-all-category`;
    return this.httpClient.get(url);
  }
  createGroupProduct(params) {
    const url = `${this.api}category/add-new-category`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  updateGroupProduct(params) {
    const url = `${this.api}category/update-category`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  deleteGroupProduct(params) {
    const url = `${this.api}category/delete-category`;
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
  getAllProvider(){
    const url = `${this.api}provider/list-all-provider`;
    return this.httpClient.get(url);
  }
  createProvider(params) {
    const url = `${this.api}provider/add-new-provider`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  updateProvider(params) {
    const url = `${this.api}provider/update-provider`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  deleteProvider(params) {
    const url = `${this.api}provider/delete-provider`;
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
  getAllProduct(){
    const url = `${this.api}product/list-all-product`;
    return this.httpClient.get(url);
  }
  createProduct(params) {
    const url = `${this.api}product/add-new-product`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  updateProduct(params) {
    const url = `${this.api}product/update-product`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  deleteProduct(params) {
    const url = `${this.api}product/delete-product`;
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
  getAllWarehouse(){
    const url = `${this.api}warehouse/list-all-warehouse`;
    return this.httpClient.get(url);
  }
  createWarehouse(params) {
    const url = `${this.api}warehouse/add-new-warehouse`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  updateWarehouse(params) {
    const url = `${this.api}warehouse/update-warehouse`;
    return new Promise((resolve, reject) => {
      this.httpClient.put(url, params).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      });
    });
  }
  deleteWarehouse(params) {
    const url = `${this.api}warehouse/delete-warehouse`;
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
