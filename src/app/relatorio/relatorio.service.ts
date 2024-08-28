import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService extends ApiService {

  private route = '/relatorio';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(http: HttpClient) {
    super(http);
  }

  listar() {
    return this.http.get(this.getUrl(this.route), this.options);
  }

  autores() {
    return this.http.get(this.getUrl(this.route) + '/autores', this.options);
  }

  assuntos() {
    return this.http.get(this.getUrl(this.route) + '/assuntos', this.options);
  }
}
