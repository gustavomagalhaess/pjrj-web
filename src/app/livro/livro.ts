import { Assunto } from '../assunto/assunto'
import { Autor } from '../autor/autor'

export interface Livro {
  Codl: number,
  Titulo: string,
  Editora: string,
  Edicao: number,
  AnoPublicacao: string,
  autores?: Autor[],
  assuntos?: Assunto[]
}
