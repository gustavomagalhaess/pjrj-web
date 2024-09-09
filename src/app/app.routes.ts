import { Routes } from '@angular/router';
import { AuthorListComponent } from './author/author-list/author-list.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { ReportsComponent } from './reports/reports.component';
import { SubjectListComponent } from './subject/subject-list/subject-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'authors', component: AuthorListComponent },
  { path: 'subjects', component: SubjectListComponent },
  { path: 'reports', component: ReportsComponent }
];
