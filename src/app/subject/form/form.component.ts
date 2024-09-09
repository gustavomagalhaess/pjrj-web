import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'subject-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

  @Output() saved = new EventEmitter();
  @Input() subject?: Subject;
  public submitBtn = 'Save';
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

  salvar () {
    const subject = this.subjectForm.value;
    let crud: any = null;

    if (this.subject) {
      crud = this.service.save(subject, this.subject.id);
    } else {
      crud = this.service.save(subject);
    }

    crud.subscribe({
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
