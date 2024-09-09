import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../book.service';

@Component({
  selector: 'book-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './delete-form.component.html',
})
export class DeleteFormComponent {
  @Output() exluded = new EventEmitter();
  @Input() book: any;
  public confirmBtn = 'Confirm';

  constructor (
    public activeModal: NgbActiveModal,
    public service: BookService
  ) {}

  public excluir () {
    this.service.delete(this.book.id).subscribe({
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
