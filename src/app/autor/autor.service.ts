import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutorService extends ApiService {

  private route = '/autores';

  constructor(http: HttpClient) {
    super(http);
  }

  listar(pagination?: any) {
 
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
    }

    return this.http.get(this.getUrl(this.route), options);
  }

  todos() {
    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
    }

    return this.http.get(this.getUrl(this.route + '/todos'), options);
  }

  buscar(CodAu: number) {
    return this.http.get(this.getUrl(this.route + '/' + CodAu))
  }

  salvar(body:any, CodAu?: number) {
    if (CodAu) {
      return this.http.put(this.getUrl(this.route + '/' + CodAu  + '/alterar'), body);
    }

    return this.http.post(this.getUrl(this.route), body);
  }

  excluir (CodAu: number) {
    return this.http.delete(this.getUrl(this.route + '/' + CodAu  + '/excluir'));
  }
}