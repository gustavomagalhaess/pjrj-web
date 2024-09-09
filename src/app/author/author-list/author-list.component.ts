import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { ListComponent } from '../../shared/list/list.component';
import { Author } from '../author';
import { AuthorService } from '../author.service';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'author-author-list',
  standalone: true,
  imports: [ListComponent, PaginatorComponent],
  templateUrl: './author-list.component.html'
})
export class AuthorListComponent implements OnInit {

  public authors: Author[] = [];
  public pagination: any = [];
  public links: any = [];
  public count: number = 0;
  public created: boolean = false;
  public message: string = 'Author saved successfully.';

  private options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    backdropClass: 'backdrop-modal',
    windowClass: 'position-modal',
  };

  constructor (
    private service: AuthorService,
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
        this.authors = response.data;
        this.pagination = response;
        this.count = response.data.length;
        this.links = response.links;
      }
    );
  }

  private find (is: number) {
    return this.service.find(is);
  }

  store () {
    this.created = false;
    const modalRef = this.modalService.open(FormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((response: any) => {
      this.created = response.created;
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  update (author: Author) {
    this.created = false;
    this.find(author.id).subscribe(
      (author) => {
        const modalRef = this.modalService.open(FormComponent, this.options);

        modalRef.componentInstance.author = author;
        modalRef.componentInstance.saved.subscribe((response: any) => {
          this.created = response.updated;
          this.list();
          modalRef.componentInstance.activeModal.close();
          this.setTempoMensagem();
        });
      }
    );
  }

  delete (author: Author) {
    this.created = false;
    const modalRef = this.modalService.open(DeleteFormComponent, this.options);

    modalRef.componentInstance.author = author;
    modalRef.componentInstance.exluded.subscribe((response: any) => {
      this.created = response.deleted;
      this.message = 'Author deleted successfully.';
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  private setTempoMensagem () {
    setTimeout(() => this.created = false, 5000);
  }
}
