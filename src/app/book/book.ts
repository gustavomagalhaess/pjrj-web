import { Author } from '../author/author';
import { Subject } from '../subject/subject';

export interface Book {
  id: number,
  title: string,
  publisher: string,
  edition: number,
  published_at: string,
  authors?: Author[],
  subjects?: Subject[]
}
