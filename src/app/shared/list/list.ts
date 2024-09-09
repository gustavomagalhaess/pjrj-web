export interface List {
  emitter(event: any): void;
  update(record: any): void;
  delete(record: any): void;
}
