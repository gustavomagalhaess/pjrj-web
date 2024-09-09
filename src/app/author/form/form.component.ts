import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
  selector: 'author-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

  @Output() saved = new EventEmitter();
  @Input() author?: Author;
  public submitBtn = 'Salvar';
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
    let crud: any = null;

    if (this.author) {
      crud = this.service.save(autor, this.author.id);
    } else {
      crud = this.service.save(autor);
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
