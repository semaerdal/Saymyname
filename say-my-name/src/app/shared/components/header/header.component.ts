import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuActive = false;
  searchQuery = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  search() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
      this.closeMenu();
    }
  }

  async logout() {
    await this.authService.logout();
    this.closeMenu();
    this.router.navigate(['/home']);
  }
}