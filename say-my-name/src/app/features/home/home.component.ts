import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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