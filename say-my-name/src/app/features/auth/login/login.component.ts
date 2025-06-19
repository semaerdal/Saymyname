import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
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
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  errorMessage: string | null = null;
  isLoading = false;

  // Form Groups
  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
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
    this.errorMessage = null;
  }

  async onSignup() {
    if (this.signupForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const { email, password, firstName, lastName } = this.signupForm.value;
    
    try {
      if (!email || !password || !firstName || !lastName) {
        throw new Error('Alle Felder müssen ausgefüllt sein');
      }

      // 1. Benutzerkonto erstellen
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );

      // 2. Zusätzliche Benutzerdaten in Firestore speichern
      await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
        lastLogin: new Date()
      });

      // 3. Weiterleiten
      this.router.navigate(['/dashboard']);

    } catch (error: unknown) {
      this.handleFirebaseError(error);
    } finally {
      this.isLoading = false;
    }
  }

  async onLogin() {
    if (this.loginForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    
    try {
      if (!email || !password) {
        throw new Error('E-Mail und Passwort benötigt');
      }

      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);

    } catch (error: unknown) {
      this.handleFirebaseError(error);
    } finally {
      this.isLoading = false;
    }
  }

  private handleFirebaseError(error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'Diese E-Mail ist bereits registriert';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'Ungültige E-Mail-Adresse';
          break;
        case 'auth/weak-password':
          this.errorMessage = 'Passwort muss mindestens 6 Zeichen haben';
          break;
        case 'auth/user-not-found':
          this.errorMessage = 'Kein Konto mit dieser E-Mail gefunden';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Falsches Passwort';
          break;
        case 'auth/too-many-requests':
          this.errorMessage = 'Zu viele Anfragen. Bitte später erneut versuchen';
          break;
        default:
          this.errorMessage = `Fehler: ${error.message}`;
      }
    } else {
      this.errorMessage = 'Ein unerwarteter Fehler ist aufgetreten';
      console.error('Unknown error:', error);
    }
  }

  isFieldInvalid(form: FormGroup, field: string) {
    const control = form.get(field);
    return control?.invalid && (control?.dirty || control?.touched);
  }
}