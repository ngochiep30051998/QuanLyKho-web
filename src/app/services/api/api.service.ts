import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
