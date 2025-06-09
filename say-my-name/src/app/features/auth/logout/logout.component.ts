import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <div class="logout-container">
      <p>Möchten Sie sich wirklich abmelden?</p>
      <button (click)="onLogout()">Abmelden</button>
      <button (click)="onCancel()">Abbrechen</button>
    </div>
  `,
  styles: [`
    .logout-container {
      text-align: center;
      padding: 20px;
    }
    button {
      margin: 0 10px;
      padding: 8px 16px;
    }
  `]
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}