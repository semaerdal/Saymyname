import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseError } from 'firebase/app';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  activeTab: 'login' | 'signup' = 'login';
  auth = inject(Auth);
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

  constructor(private router: Router) {}

  switchTab(tab: 'login' | 'signup') {
    this.activeTab = tab;
    this.errorMessage = null; // Fehlermeldung zurücksetzen beim Tab-Wechsel
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
  console.log('Login-Formular:', this.loginForm.value); // Debug-Ausgabe
  
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    
    try {
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        console.log('Erfolgreich eingeloggt:', userCredential.user);
        this.router.navigate(['/']);
      }
    } catch (error: unknown) {
      console.error('Login-Fehler:', error); // Wichtig für Debugging
      
      if (error instanceof FirebaseError) {
        this.handleFirebaseError(error);
      } else {
        this.errorMessage = 'Unbekannter Fehler: ' + JSON.stringify(error);
      }
    }
  } else {
    console.log('Formular ungültig', this.loginForm.errors);
    this.errorMessage = 'Bitte fülle alle Felder korrekt aus';
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

