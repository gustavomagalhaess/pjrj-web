import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../author.service';

@Component({
  selector: 'author-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './delete-form.component.html',
})
export class DeleteFormComponent {
  @Output() exluded = new EventEmitter();
  @Input() author: any;
  public confirmBtn = 'Confirm';

  constructor (
    public activeModal: NgbActiveModal,
    public service: AuthorService
  ) {}

  public delete () {
    this.service.delete(this.author.id).subscribe({
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
