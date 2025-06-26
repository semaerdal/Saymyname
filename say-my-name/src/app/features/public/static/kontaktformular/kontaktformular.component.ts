import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-kontaktformular',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kontaktformular.component.html',
  styleUrls: ['./kontaktformular.component.css']
})

// Abgeschickt oder nicht
export class KontaktformularComponent {
  kontaktForm: FormGroup;
  submitted = false;
  success = false;
  isLoading = false;

  constructor(private firestore: Firestore, private fb: FormBuilder) {
    this.kontaktForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Abschicken
  async onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.kontaktForm.invalid) {
      this.isLoading = false;
      return;
    }

    const formData = {
      name: this.kontaktForm.value.name,
      email: this.kontaktForm.value.email,
      subject: this.kontaktForm.value.subject,
      message: this.kontaktForm.value.message,
      timestamp: new Date().toISOString()
    };

    // in Firestore "kontakte" speichern
    try {
      const docRef = await addDoc(collection(this.firestore, 'kontakte'), formData);
      console.log("Document written with ID: ", docRef.id);
      this.success = true;
      this.kontaktForm.reset();
      this.submitted = false;
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      this.isLoading = false;
    }
  }
}