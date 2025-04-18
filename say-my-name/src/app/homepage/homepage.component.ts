import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; // Add for Material buttons

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatButtonModule], // Add MatButtonModule here
  template: `
  `,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  products = [
    { name: 'Premium T-Shirt', price: 24.99 },
    { name: 'Classic Jeans', price: 49.99 },
    { name: 'Running Shoes', price: 89.99 }
  ];
}