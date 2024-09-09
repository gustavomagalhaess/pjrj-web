import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorService } from '../../author/author.service';
import { SubjectService } from '../../subject/subject.service';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'book-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit, AfterViewInit {

  @Output() saved = new EventEmitter();
  @Input() book?: Book;
  public authors: any[] = [];
  public subjects: any[] = [];
  public submitBtn = 'Save';
  public bookForm!: FormGroup;
  public errors: any = [];

  constructor (
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private service: BookService,
    private autorService: AuthorService,
    private subjectService: SubjectService
  ) {}

  ngOnInit (): void {
    this.bookForm = this.formBuilder.group({
      'title': ['', [Validators.required, Validators.maxLength(40)]],
      'publisher': ['', [Validators.required, Validators.maxLength(40)]],
      'edition': ['', [Validators.required]],
      'published_at': ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]{4}')]],
      'authors': [[]],
      'subjects': [[]],
    });

    this.getAuthors();
    this.getSubjects();
  }

  ngAfterViewInit () {
    if (this.book) {
      this.bookForm.get('title')?.setValue(this.book.title);
      this.bookForm.get('publisher')?.setValue(this.book.publisher);
      this.bookForm.get('edition')?.setValue(this.book.edition);
      this.bookForm.get('published_at')?.setValue(this.book.published_at);
    }
  }

  save () {
    const book = this.bookForm.value;
    let save: any = null;

    if (this.book) {
      save = this.service.save(book, this.book.id);
    } else {
      save = this.service.save(book);
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

  getAuthors () {
    this.autorService.all().subscribe(
      (authors: any) => this.authors = authors
    );
  }

  getSubjects () {
    this.subjectService.all().subscribe(
      (subjects: any) => this.subjects = subjects
    );
  }
}
