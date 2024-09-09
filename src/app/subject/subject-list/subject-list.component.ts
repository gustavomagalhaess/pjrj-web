import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { List } from '../../shared/list/list';
import { ListComponent } from '../../shared/list/list.component';
import { DeleteFormComponent } from '../delete-form/delete-form.component';
import { SubjectFormComponent } from '../subject-form/subject-form.component';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'subject-book-subject-list',
  standalone: true,
  imports: [ListComponent, PaginatorComponent],
  templateUrl: './subject-list.component.html'
})
export class SubjectListComponent implements OnInit, List {

  public subjects: Subject[] = [];
  public pagination: any = [];
  public links: any = [];
  public count: number = 0;
  public created: boolean = false;
  public message: string = 'Subjects saved successfully.';

  private options: NgbModalOptions = {
    backdrop: 'static',
    centered: true,
    backdropClass: 'backdrop-modal',
    windowClass: 'position-modal',
  };

  constructor (
    private service: SubjectService,
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
        this.subjects = response.data;
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
    const modalRef = this.modalService.open(SubjectFormComponent, this.options);

    modalRef.componentInstance.saved.subscribe((response: any) => {
      this.created = response.created;
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  update (subject: Subject) {
    this.created = false;
    this.find(subject.id).subscribe(
      (subject) => {
        const modalRef = this.modalService.open(SubjectFormComponent, this.options);

        modalRef.componentInstance.subject = subject;
        modalRef.componentInstance.saved.subscribe((response: any) => {
          this.created = response.updated;
          this.list();

          modalRef.componentInstance.activeModal.close();
          this.setTempoMensagem();
        });
      }
    );
  }

  delete (subject: Subject) {
    this.created = false;
    const modalRef = this.modalService.open(DeleteFormComponent, this.options);

    modalRef.componentInstance.subject = subject;
    modalRef.componentInstance.exluded.subscribe((response: any) => {
      this.created = response.deleted;
      this.message = 'Subjects deleted successfully';
      this.list();
      modalRef.componentInstance.activeModal.close();
      this.setTempoMensagem();
    });
  }

  private setTempoMensagem () {
    setTimeout(() => this.created = false, 5000);
  }
}
