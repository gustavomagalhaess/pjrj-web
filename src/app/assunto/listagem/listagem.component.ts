import { Component, OnInit } from '@angular/core';
import { AssuntoService } from '../assunto.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { FormExcluirComponent } from '../form-excluir/form-excluir.component';

@Component({
  selector: 'assunto-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  public assuntos: any;
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
    private service: AssuntoService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  public listar(pagination?: any) {
    this.service.listar(pagination).subscribe(
      (response: any) => {
        this.assuntos = response.data;
        this.pagination = response;
        this.count = response.data.length;
        this.links = response.links;
      }
  
    );
  }

  public isNumber(str: any) {
    return !isNaN(str);
  }

  private buscar(CodAs: number) {
    return this.service.buscar(CodAs);
  }

  abrirModal() {
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((assunto: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
  
  abrirModalBuscar(CodAs: number) {
    this.buscar(CodAs).subscribe(
      (assunto) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.assunto = assunto;
        modalRef.componentInstance.saved.subscribe((assunto: any) => {
          this.listar();
          modalRef.componentInstance.activeModal.close();
        });
      }
    );
  }

  abrirModalExcluir(assunto: any) {
    const modalRef = this.modalService.open(FormExcluirComponent, this.options);

    modalRef.componentInstance.assunto = assunto;
    modalRef.componentInstance.exluded.subscribe((autor: any) => {
      this.listar();
      modalRef.componentInstance.activeModal.close();
    });
  }
}
