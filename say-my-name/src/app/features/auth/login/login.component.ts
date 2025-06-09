import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

interface AuthResponse {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: 'login' | 'signup' = 'login';
  isLoading = false;
  errorMessage: string | null = null;

  // Form Groups
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private authService: AuthService) {}

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
    this.errorMessage = null;
  }

  async onSignup() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const { firstName, lastName, email, password } = this.signupForm.value;

      try {
        const response = await this.authService.register({ 
          firstName: firstName || '', 
          lastName: lastName || '', 
          email: email || '', 
          password: password || '' 
        });
        this.isLoading = false;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate(['/']);
      } catch (error: any) {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut.';
      }
    }
  }

  async onLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const { email, password } = this.loginForm.value;

      try {
        const response = await this.authService.login({ 
          email: email || '', 
          password: password || '' 
        });
        this.isLoading = false;
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.router.navigate(['/']);
      } catch (error: any) {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihre Daten.';
      }
    }
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
}