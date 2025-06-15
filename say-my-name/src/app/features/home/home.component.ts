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
      name: 'Makeup',
      image: 'assets/images/landing/makeup.jpg',
      link: '/products?category=makeup'
    },
    {
      name: 'Brushes',
      image: 'assets/images/landing/brushes.jpg',
      link: '/products?category=brushes'
    }
  ];

  featuredProducts = [
    {
      name: 'Luminous Foundation',
      price: 42,
      image: 'assets/images/products/istockphoto-1455210308-1024x1024.jpg'
    },
    {
      name: 'Matte Lipstick',
      price: 28,
      image: 'assets/images/products/istockphoto-668311868-1024x1024.jpg'
    },
    {
      name: 'Blush Duo',
      price: 34,
      image: 'assets/images/products/istockphoto-668311868-1024x1024.jpg'
    }
  ];
}