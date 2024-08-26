import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssuntoService } from '../assunto.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'assunto-form-excluir',
  standalone: true,
  imports: [],
  templateUrl: './form-excluir.component.html',
})
export class FormExcluirComponent {
  @Output() exluded = new EventEmitter();
  @Input() assunto: any;
  public confirmBtn = "Confirmar";

  constructor(
    public activeModal: NgbActiveModal,
    public service: AssuntoService
  ) {}

  public excluir() {
    this.service.excluir(this.assunto.CodAs).subscribe({
        next: (response: any) => {
          this.exluded.emit(response);
        },
        error: (exception: any) => {
          this.activeModal.close();
          alert(exception.error.message);
        }
    });
  }
}
