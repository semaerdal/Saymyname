import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  menuActive = false;
  searchTerm: string = ''; // Suchbegriff speichern
  @Output() searchEvent = new EventEmitter<string>();

  // Menü Mobil
  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  // Suchen
  search() {
    this.searchEvent.emit(this.searchTerm);
  }
}