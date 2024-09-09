import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { List } from '../../shared/list/list';
import { ListComponent } from '../../shared/list/list.component';
import { Book } from '../book';
import { BookService } from '../book.service';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'book-list',
  standalone: true,
  imports: [ListComponent, PaginatorComponent],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit, List {

  public books: Book[] = [];
  public pagination: any = [];
  public links: any = [];
  public count: number = 0;
  public created: boolean = false;
  public message: string = 'Book saved successfully.';

  private options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    backdropClass: 'backdrop-modal',
    windowClass: 'position-modal',
  };

  constructor (
    private service: BookService,
    private modalService: NgbModal
  ) {}

  ngOnInit (): void {
    this.list();
  }

  public emitter (event: any) {
    if (Object.hasOwn(event, 'update')) {
      this.update(event.update);
    } else {
      this.delete(event.delete);
    }
  }

  public list (pagination?: any) {
    this.service.list(pagination).subscribe(
      (response: any) => {
        this.books = response.data;
        this.pagination = response;
        this.count = response.data.length;
        this.links = response.links;
      }
    );
  }

  private find (id: number) {
    return this.service.find(id);
  }

  store () {
    this.created = false;
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((response: any) => {
      this.created = response.created;
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setMessageTime();
    });
  }

  update (book: Book) {
    this.created = false;
    this.find(book.id).subscribe(
      (book) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.book = book;
        modalRef.componentInstance.saved.subscribe((response: any) => {
          this.created = response.updated;
          this.list();
          modalRef.componentInstance.activeModal.close();
          this.setMessageTime();
        });
      }
    );
  }

  delete (book: Book) {
    this.created = false;
    const modalRef = this.modalService.open(DeleteFormComponent, this.options);

    modalRef.componentInstance.book = book;
    modalRef.componentInstance.exluded.subscribe((response: any) => {
      this.created = response.deleted;
      this.message = 'Book deleted successfully.';
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setMessageTime();
    });
  }

  private setMessageTime () {
    setTimeout(() => this.created = false, 5000);
  }
}
