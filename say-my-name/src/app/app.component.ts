import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  template: `
  <main>
      <app-router></app-router>
      <router-outlet></router-outlet>
      </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'say-my-name';
}
