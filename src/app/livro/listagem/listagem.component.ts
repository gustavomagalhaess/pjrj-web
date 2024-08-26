import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { FormExcluirComponent } from '../form-excluir/form-excluir.component';

@Component({
  selector: 'livro-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  public livros: any;
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
    private service: LivroService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar(pagination?: any) {
    this.service.listar(pagination).subscribe(
      (response: any) => {
        this.livros = response.data;
        this.pagination = response;
        this.count = response.data.length;
        this.links = response.links;
      }
  
    );
  }

  public isNumber(str: any) {
    return !isNaN(str);
  }

  private buscar(Codl: number) {
    return this.service.buscar(Codl);
  }

  abrirModal() {
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((livro: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
  
  abrirModalBuscar(CodAu: number) {
    this.buscar(CodAu).subscribe(
      (livro) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.livro = livro;
        modalRef.componentInstance.saved.subscribe((livro: any) => {
          this.listar();
          modalRef.componentInstance.activeModal.close();
        });
      }
    );
  }

  abrirModalExcluir(livro: any) {
    const modalRef = this.modalService.open(FormExcluirComponent, this.options);

    modalRef.componentInstance.livro = livro;
    modalRef.componentInstance.exluded.subscribe((livro: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
}
