import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends ApiService {

  private route = '/livros';

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

  buscar(Codl: number) {
    return this.http.get(this.getUrl(this.route + '/' + Codl))
  }

  salvar(body:any, Codl?: number) {
    if (Codl) {
      return this.http.put(this.getUrl(this.route + '/' + Codl  + '/alterar'), body);
    }

    return this.http.post(this.getUrl(this.route), body);
  }

  excluir (Codl: number) {
    return this.http.delete(this.getUrl(this.route + '/' + Codl  + '/excluir'));
  }
}