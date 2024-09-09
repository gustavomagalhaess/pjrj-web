import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends ApiService {

  private route = '/reports';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor (http: HttpClient) {
    super(http);
  }

  list () {
    return this.http.get(this.getUrl(this.route), this.options);
  }

  authors () {
    return this.http.get(this.getUrl(this.route) + '/authors', this.options);
  }

  subjects () {
    return this.http.get(this.getUrl(this.route) + '/subjects', this.options);
  }
}
