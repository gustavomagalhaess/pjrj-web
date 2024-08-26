import { AfterViewInit, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { AutorService } from '../../autor/autor.service';
import { AssuntoService } from '../../assunto/assunto.service';

@Component({
  selector: 'livro-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

    @Output() saved = new EventEmitter();
    @Input() livro?: any;
    public autores: any[] = [];
    public assuntos: any[] = [];
    public submitBtn = 'Salvar';
    public livroForm!: FormGroup;
    public errors: any = [];
    
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private service: LivroService,
        private autorService: AutorService,
        private assuntoService: AssuntoService
    ) {}

    ngOnInit(): void {
        this.livroForm = this.formBuilder.group({
            'titulo': ['', [Validators.required, Validators.maxLength(40)]],
            'editora': ['', [Validators.required, Validators.maxLength(40)]],
            'edicao': ['', [Validators.required]],
            'publicacao': ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]{4}')]],
            'autores': [[]],
            'assuntos': [[]],
        });

        this.buscarAutores();
        this.buscarAssuntos();
    }
    
    ngAfterViewInit() {
        if (this.livro) {
            this.livroForm.get('titulo')?.setValue(this.livro.Titulo);
            this.livroForm.get('editora')?.setValue(this.livro.Editora);
            this.livroForm.get('edicao')?.setValue(this.livro.Edicao);
            this.livroForm.get('publicacao')?.setValue(this.livro.AnoPublicacao);
        }
    }

    salvar() {
        const livro = this.livroForm.value; 
        let crud: any = null;

        if (this.livro) {
            crud = this.service.salvar(livro, this.livro.Codl);
        } else {
            crud = this.service.salvar(livro);
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

    buscarAutores() {
        this.autorService.todos().subscribe(
            (autores: any) => this.autores = autores
        );
    }

    buscarAssuntos() {
        this.assuntoService.todos().subscribe(
            (assuntos: any) => this.assuntos = assuntos
        );
    }

}
