import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: 'login' | 'signup' = 'login';
  auth = inject(Auth);
  errorMessage: string | null = null;
  isLoggedIn = false;

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

  constructor(private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  }

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
    this.errorMessage = null;
  }

  async onSignup() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      
      try {
        if (email && password) {
          await createUserWithEmailAndPassword(this.auth, email, password);
          console.log('User created successfully');
          this.router.navigate(['/']);
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          this.handleFirebaseError(error);
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    }
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      try {
        if (email && password) {
          await signInWithEmailAndPassword(this.auth, email, password);
          console.log('User logged in successfully');
          this.router.navigate(['/']);
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          this.handleFirebaseError(error);
        } else {
          this.errorMessage = 'An unknown error occurred';
        }
      }
    }
  }

  async onLogout() {
    try {
      await signOut(this.auth);
      console.log('User logged out successfully');
      // Zur Login-Seite navigieren statt zu /auth
      this.router.navigate(['/login']); 
      // Optional: Formulare zurücksetzen
      this.loginForm.reset();
      this.signupForm.reset();
      this.activeTab = 'login';
    } catch (error) {
      console.error('Logout error:', error);
      this.errorMessage = 'Logout failed';
    }
  }

  private handleFirebaseError(error: FirebaseError) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.errorMessage = 'Diese E-Mail-Adresse wird bereits verwendet.';
        break;
      case 'auth/invalid-email':
        this.errorMessage = 'Ungültige E-Mail-Adresse.';
        break;
      case 'auth/weak-password':
        this.errorMessage = 'Passwort ist zu schwach (mindestens 6 Zeichen).';
        break;
      case 'auth/user-not-found':
        this.errorMessage = 'Kein Benutzer mit dieser E-Mail gefunden.';
        break;
      case 'auth/wrong-password':
        this.errorMessage = 'Falsches Passwort.';
        break;
      default:
        this.errorMessage = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
        console.error('Firebase error:', error);
    }
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}