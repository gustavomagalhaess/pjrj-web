import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService extends ApiService {

  private route = '/relatorio';

  constructor(http: HttpClient) {
    super(http);
  }

  listar() {
     const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }

    return this.http.get(this.getUrl(this.route), options);
  }
}