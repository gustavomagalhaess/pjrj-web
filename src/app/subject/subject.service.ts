import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ApiService {

  private route = '/subjects';

  constructor (http: HttpClient) {
    super(http);
  }

  list (pagination?: any) {

    let params = {};

    if (pagination) {
      const queryParams = this.extracQueryPagination(pagination);
      params = new HttpParams({ fromString: queryParams });
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    };

    return this.http.get(this.getUrl(this.route), options);
  }

  all () {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.get(this.getUrl(this.route + '/all'), options);
  }

  find (id: number) {
    return this.http.get(this.getUrl(this.route + '/' + id));
  }

  save (body: any, id?: number) {
    if (id) {
      return this.http.put(this.getUrl(this.route + '/' + id), body);
    }

    return this.http.post(this.getUrl(this.route), body);
  }

  delete (id: number) {
    return this.http.delete(this.getUrl(this.route + '/' + id));
  }
}
