/*import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this import

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount = 0;
}
*/

// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // Add this import

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }
}