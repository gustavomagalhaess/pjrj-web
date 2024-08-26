import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { AssuntoService } from '../assunto.service';

@Component({
  selector: 'autor-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

    @Output() saved = new EventEmitter();
    @Input() assunto?: any;
    public submitBtn = 'Salvar';
    public assuntoForm!: FormGroup;
    public errors: any = [];
    
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private service: AssuntoService   
    ) { }

    ngOnInit(): void {
        this.assuntoForm = this.formBuilder.group({
            'descricao': ['', [Validators.required, Validators.maxLength(40)]],
        });
    }
    
    ngAfterViewInit() {
        if (this.assunto) {
            this.assuntoForm.get('descricao')?.setValue(this.assunto.Descricao);
        }
    }

    salvar() {
        const autor = this.assuntoForm.value; 
        let crud: any = null;

        if (this.assunto) {
            crud = this.service.salvar(autor, this.assunto.CodAs);
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
