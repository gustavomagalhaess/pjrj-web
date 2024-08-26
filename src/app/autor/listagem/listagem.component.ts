import { Component, OnInit } from '@angular/core';
import { AutorService } from '../autor.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { FormExcluirComponent } from '../form-excluir/form-excluir.component';

@Component({
  selector: 'autor-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  public autores: any;
  public pagination: any = [];
  public links: any = [];
  public count: number = 0;

  private options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    backdropClass: 'backdrop-modal',
    windowClass: 'position-modal',
  }

  constructor(
    private service: AutorService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar(pagination?: any) {
    this.service.listar(pagination).subscribe(
      (response: any) => {
        this.autores = response.data;
        this.pagination = response;
        this.count = response.data.length;
        this.links = response.links;
      }
  
    );
  }

  public isNumber(str: any) {
    return !isNaN(str);
  }

  private buscar(CodAu: number) {
    return this.service.buscar(CodAu);
  }

  abrirModal() {
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((autor: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
  
  abrirModalBuscar(CodAu: number) {
    this.buscar(CodAu).subscribe(
      (autor) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.autor = autor;
        modalRef.componentInstance.saved.subscribe((autor: any) => {
          this.listar();
          modalRef.componentInstance.activeModal.close();
        });
      }
    );
  }

  abrirModalExcluir(autor: any) {
    const modalRef = this.modalService.open(FormExcluirComponent, this.options);

    modalRef.componentInstance.autor = autor;
    modalRef.componentInstance.exluded.subscribe((autor: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
}
