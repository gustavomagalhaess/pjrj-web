import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent {
  @Input() count: number = 0;
  @Input() pagination: any;
  @Input() links: any;
  @Output() listarEmitter = new EventEmitter();

  public isNumber(str: any) {
    return !isNaN(str);
  }

  public listar(url: string) {
    this.listarEmitter.emit(url);
  }
}
