import { Component, OnInit } from '@angular/core';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  // Bei Suche zur Produktseite
  onSearch(searchTerm: string) {
    this.router.navigate(['/products'],
      {
        queryParams: { search: searchTerm },
        queryParamsHandling: 'merge'
      });
  }

  // nach oben scrollen bei neuer Seite
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}