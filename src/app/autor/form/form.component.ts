import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { Autor } from '../autor'
import { AutorService } from '../autor.service';

@Component({
  selector: 'autor-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

    @Output() saved = new EventEmitter();
    @Input() autor?: Autor;
    public submitBtn = 'Salvar';
    public autorForm!: FormGroup;
    public errors: any = [];

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private service: AutorService
    ) { }

    ngOnInit(): void {
        this.autorForm = this.formBuilder.group({
            'nome': ['', [Validators.required, Validators.maxLength(40)]],
        });
    }

    ngAfterViewInit() {
        if (this.autor) {
            this.autorForm.get('nome')?.setValue(this.autor.Nome);
        }
    }

    salvar() {
        const autor = this.autorForm.value;
        let crud: any = null;

        if (this.autor) {
            crud = this.service.salvar(autor, this.autor.CodAu);
        } else {
            crud = this.service.salvar(autor);
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
