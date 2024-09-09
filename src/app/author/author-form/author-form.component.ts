import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Form as FormInterface } from '../../shared/form/form';
import { FormComponent } from '../../shared/form/form.component';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'author-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormComponent],
  templateUrl: './author-form.component.html'
})
export class AuthorFormComponent implements OnInit, AfterViewInit, FormInterface {

  @Output() saved = new EventEmitter();
  @Input() author?: Author;
  public autorForm!: FormGroup;
  public errors: any = [];

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: AuthorService
  ) { }

  ngOnInit (): void {
    this.autorForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.maxLength(40)]],
    });
  }

  ngAfterViewInit () {
    if (this.author) {
      this.autorForm.get('name')?.setValue(this.author.name);
    }
  }

  save () {
    const autor = this.autorForm.value;
    let save: any = null;

    if (this.author) {
      save = this.service.save(autor, this.author.id);
    } else {
      save = this.service.save(autor);
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
