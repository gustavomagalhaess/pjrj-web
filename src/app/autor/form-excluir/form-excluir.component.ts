import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutorService } from '../autor.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'autor-form-excluir',
  standalone: true,
  imports: [],
  templateUrl: './form-excluir.component.html',
})
export class FormExcluirComponent {
  @Output() exluded = new EventEmitter();
  @Input() autor: any;
  public confirmBtn = "Confirmar";

  constructor(
    public activeModal: NgbActiveModal,
    public service: AutorService
  ) {}

  public excluir() {
    this.service.excluir(this.autor.CodAu).subscribe({
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
