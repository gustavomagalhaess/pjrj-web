import { Component, OnInit } from '@angular/core';
import { DxDataGridModule, DxPieChartModule } from 'devextreme-angular'
import { RelatorioService } from './relatorio.service';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [DxDataGridModule, DxPieChartModule],
  templateUrl: './relatorio.component.html'
})
export class RelatorioComponent implements OnInit {

  public livros: any[] = [];
  public autores: any[] = [];
  public assuntos: any[] = [];

  constructor(private service: RelatorioService) {}

  ngOnInit(): void {
    this.listar();
    this.listarAutores();
    this.listarAssuntos();
  }

  public listar() {
    this.service.listar().subscribe(
      (response: any) => {
          this.livros = response;
      }
    );
  }

  public listarAutores() {
    this.service.autores().subscribe(
      (response: any) => {
          this.autores = response;
      }
    );
  }

  public listarAssuntos() {
    this.service.assuntos().subscribe(
      (response: any) => {
          this.assuntos = response;
      }
    );
  }
}
