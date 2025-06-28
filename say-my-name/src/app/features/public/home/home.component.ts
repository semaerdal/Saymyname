import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // Kollektion
 categories = [
    {
      name: 'Skincare',
      image: 'assets/images/products/cream.jpg',
      link: '/products?category=skincare'
    },

    {
      name: 'Makeup',
      image: 'assets/images/products/cushion_foundation.jpg',
      link: '/products?category=makeup'
    },
    {
      name: 'Brushes',
      image: 'assets/images/products/brushes.jpg',
      link: '/products?category=brushes'
    }
  ];

  // Best Sellers
  featuredProducts = [
    {
      name: 'Luminous Foundation',
      price: 42,
      image: 'assets/images/products/foundation.jpg'
    },
    {
      name: 'Matte Lipstick',
      price: 28,
      image: 'assets/images/products/lipstick.jpg'
    },
    {
      name: 'Cream Highlighter',
      price: 34,
      image: 'assets/images/products/cream.jpg'
    },
    {
      name: 'Makeup Brushes Set',
      price: 65,
      image: 'assets/images/products/brushes.jpg'
    }
  ];
}