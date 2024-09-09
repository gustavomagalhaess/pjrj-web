import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'list',
  standalone: true,
  templateUrl: './list.component.html'
})
export class ListComponent {
  @Output() emitter = new EventEmitter();
  @Input() columnNames: any[] = [];
  @Input() records: any[] = [];

  public objectToArray (columns: any): any[] {
    return Object.entries(columns);
  }

  /**
   * @description Returns the value of the object.
   *
   * @param record
   */
  public getValue (record: any) {
    return Object.values(record)[1];
  }

  /**
   * @description emits the update event with the record information.
   *
   * @param record
   */
  public update (record: any) {
    this.emitter.emit({ update: record });
  }

  /**
   * @description emits the delete event with the record information.
   *
   * @param record
   */
  public delete (record: any) {
    this.emitter.emit({ delete: record });
  }
}
