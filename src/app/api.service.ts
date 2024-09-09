import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  protected url = 'http://localhost/api';

  constructor (protected http: HttpClient) {}

  protected getUrl (route: string) {
    return this.url + route;
  }

  protected extracQueryPagination (pagination: any) {
    const pattern = /page=(\d)/;
    const match: any = pattern.exec(pagination);
    const query = { page: match[1] };

    return '?' + new URLSearchParams(query).toString();
  }
}
