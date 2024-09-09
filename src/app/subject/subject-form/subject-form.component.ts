import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Form as FormInterface } from '../../shared/form/form';
import { FormComponent } from '../../shared/form/form.component';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'subject-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormComponent],
  templateUrl: './subject-form.component.html'
})
export class SubjectFormComponent implements OnInit, AfterViewInit, FormInterface {

  @Output() saved = new EventEmitter();
  @Input() subject?: Subject;
  public subjectForm!: FormGroup;
  public errors: any = [];

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: SubjectService
  ) { }

  ngOnInit (): void {
    this.subjectForm = this.formBuilder.group({
      'description': ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  ngAfterViewInit () {
    if (this.subject) {
      this.subjectForm.get('description')?.setValue(this.subject.description);
    }
  }

  save () {
    const subject = this.subjectForm.value;
    let save: any = null;

    if (this.subject) {
      save = this.service.save(subject, this.subject.id);
    } else {
      save = this.service.save(subject);
    }

    save.subscribe({
      next: (response: any) => {
        this.saved.emit(response);
      },
      error: (exception: any) => {
        if (exception.error.hasOwnProperty('message')) {
          this.errors.push(exception.error.message);
        }

        if (exception.error.hasOwnProperty('errors')) {
          this.errors = Object.values(exception.error.errors);
        }
      }
    });

  }

}
