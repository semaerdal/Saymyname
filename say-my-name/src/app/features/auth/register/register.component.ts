// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrierungsForm: FormGroup;
  fehlerNachricht: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.registrierungsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      passwort: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async registrieren() {
    if (this.registrierungsForm.valid) {
      try {
        await this.authService.registrieren(
          this.registrierungsForm.value.email,
          this.registrierungsForm.value.passwort
        );
      } catch (error: any) {
        this.fehlerNachricht = error.message;
      }
    }
  }
}