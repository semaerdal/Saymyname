import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return firstValueFrom(this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData));
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    return firstValueFrom(this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials));
  }

  async logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    // Optional: Backend-Logout
    // await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, {}));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}