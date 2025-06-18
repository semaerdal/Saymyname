// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  
  private user = new BehaviorSubject(this.auth.currentUser);
  user$ = this.user.asObservable();

  async registrieren(email: string, passwort: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        passwort
      );
      this.user.next(userCredential.user);
      this.router.navigate(['/']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, passwort: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        passwort
      );
      this.user.next(userCredential.user);
      this.router.navigate(['/']);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.user.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }
}