import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LivroService } from '../livro.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'livro-form-excluir',
  standalone: true,
  imports: [],
  templateUrl: './form-excluir.component.html',
})
export class FormExcluirComponent {
  @Output() exluded = new EventEmitter();
  @Input() livro: any;
  public confirmBtn = "Confirmar";

  constructor(
    public activeModal: NgbActiveModal,
    public service: LivroService
  ) {}

  public excluir() {
    this.service.excluir(this.livro.Codl).subscribe({
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
