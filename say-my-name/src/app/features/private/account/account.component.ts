import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; 

@Component({
  selector: 'app-account',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'] 
})
export class AccountComponent {
  auth = inject(AuthService); // Modern injection syntax

  // Example usage of auth service
  user = this.auth.currentUser();
  isAuthenticated = this.auth.isAuthenticated();
}