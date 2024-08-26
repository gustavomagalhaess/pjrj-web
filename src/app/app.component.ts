import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LOCALE_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    @Inject(LOCALE_ID) public locale: string
  ){}

  public title = 'Cadastro de livros';
}
