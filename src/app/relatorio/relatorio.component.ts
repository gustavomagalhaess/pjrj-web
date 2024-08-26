import { Component, OnInit } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';
import { RelatorioService } from './relatorio.service';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [DxDataGridModule],
  templateUrl: './relatorio.component.html'
})
export class RelatorioComponent implements OnInit {

  public livros: any[] = [];

  constructor(private service: RelatorioService) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar() {
    this.service.listar().subscribe(
      (response: any) => {
          this.livros = response;
      }
    );
  }
}
