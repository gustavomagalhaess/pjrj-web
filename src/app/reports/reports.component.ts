import { Component, OnInit } from '@angular/core';
import { DxDataGridModule, DxPieChartModule } from 'devextreme-angular';
import { ReportsService } from '../reports/reports.service';

@Component({
  selector: 'reports',
  standalone: true,
  imports: [DxDataGridModule, DxPieChartModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {

  public books: any[] = [];
  public authors: any[] = [];
  public subjects: any[] = [];

  constructor (private service: ReportsService) {}

  ngOnInit (): void {
    this.listar();
    this.listarAutores();
    this.listarAssuntos();
  }

  public listar () {
    this.service.list().subscribe(
      (response: any) => {
        this.books = response;
      }
    );
  }

  public listarAutores () {
    this.service.authors().subscribe(
      (response: any) => {
        this.authors = response;
      }
    );
  }

  public listarAssuntos () {
    this.service.subjects().subscribe(
      (response: any) => {
        this.subjects = response;
      }
    );
  }
}
