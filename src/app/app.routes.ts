import { Routes } from '@angular/router';
import { ListagemComponent as LivroListagemComponent } from './livro/listagem/listagem.component';
import { ListagemComponent as AutorListagemComponent } from './autor/listagem/listagem.component';
import { ListagemComponent as AssuntoListagemComponent } from './assunto/listagem/listagem.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

export const routes: Routes = [
    { path: '', redirectTo: '/livros', pathMatch: 'full'  },
    { path: 'livros', component: LivroListagemComponent },
    { path: 'autores', component: AutorListagemComponent },
    { path: 'assuntos', component: AssuntoListagemComponent },
    { path: 'relatorio', component: RelatorioComponent }
];
