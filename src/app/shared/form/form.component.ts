import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() formLabel = 'Form';
  @Input() submitBtn = 'Save';
  @Input() errors: any = [];
  @Output() saved = new EventEmitter();

  constructor (public activeModal: NgbActiveModal) {}

  save () {
    this.saved.emit();
  }
}
