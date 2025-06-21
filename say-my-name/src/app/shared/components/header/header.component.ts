import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Für ngModel

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule], // FormsModule hinzufügen
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuActive = false;
  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  search() {
    this.searchEvent.emit(this.searchTerm);
    this.closeMenu(); // Menü schließen nach der Suche (optional)
  }
}