// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <app-header (searchEvent)="onSearch($event)"></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {


  constructor(private router: Router) { }
  onSearch(searchTerm: string) {
    this.router.navigate(['/products'],
      {
        queryParams: { search: searchTerm },
        queryParamsHandling: 'merge'
      });
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}