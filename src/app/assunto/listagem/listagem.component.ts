import { Component, OnInit } from '@angular/core';
import { Assunto } from '../assunto';
import { AssuntoService } from '../assunto.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { FormExcluirComponent } from '../form-excluir/form-excluir.component';
import { PaginatorComponent } from '../../paginator/paginator.component';

@Component({
  selector: 'assunto-listagem',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {

  public assuntos: Assunto[] = [];
  public pagination: any = [];
  public links: any = [];
  public count: number = 0;
  public created: boolean = false;
  public mensagem: string = 'Assunto salvo com sucesso.';

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
    this.created = false;
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((response: any) => {
      this.created = response.created;
      this.listar();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  abrirModalBuscar(CodAs: number) {
    this.created = false;
    this.buscar(CodAs).subscribe(
      (assunto) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.assunto = assunto;
        modalRef.componentInstance.saved.subscribe((response: any) => {
          this.created = response.updated;
          this.listar();
          modalRef.componentInstance.activeModal.close();
          this.setTempoMensagem();
        });
      }
    );
  }

  abrirModalExcluir(assunto: any) {
    this.created = false;
    const modalRef = this.modalService.open(FormExcluirComponent, this.options);

    modalRef.componentInstance.assunto = assunto;
    modalRef.componentInstance.exluded.subscribe((response: any) => {
      this.created = response.deleted;
      this.mensagem = 'Assunto excluído com sucesso';
      this.listar();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  private setTempoMensagem() {
    setTimeout(() => this.created = false, 5000);
  }
}
