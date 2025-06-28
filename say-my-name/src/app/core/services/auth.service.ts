import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor() { }

  // Speichert Userdaten und Token bei Login
  login(credentials: { email: string; password: string }) {
    return this.http.post('/api/auth/login', credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('auth_token', response.token);
        this.isAuthenticated.set(true);
        this.currentUser.set(response.user);
      })
    );
  }

  // entfernt Token bei Logout, navigiert zurück zu Login
  logout() {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // liefert gespeicherte Token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}