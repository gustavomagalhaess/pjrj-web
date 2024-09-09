import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'subject-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './delete-form.component.html',
})
export class DeleteFormComponent {
  @Output() exluded = new EventEmitter();
  @Input() subject: any;
  public confirmBtn = 'Confirm';

  constructor (
    public activeModal: NgbActiveModal,
    public service: SubjectService
  ) {}

  public delete () {
    this.service.delete(this.subject.id).subscribe({
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
