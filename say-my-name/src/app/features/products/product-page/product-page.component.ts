import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  imagePath: string;
  description: string;
  details: { 
    shade?: string; 
    weight: string; 
    type: string 
  };
  isAdded: boolean;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Luminous Foundation',
      price: 42,
      imagePath: 'assets/images/products/foundation.jpg',
      description: 'Weightless medium-to-full coverage with a natural radiant finish',
      details: {
        shade: 'Warm Beige',
        weight: '30ml',
        type: 'Liquid'
      },
      isAdded: false
    },
    {
      id: 2,
      name: 'Matte Lipstick',
      price: 28,
      imagePath: 'assets/images/products/lipstick.jpg',
      description: 'Long-wearing, highly pigmented matte finish',
      details: {
        shade: 'Rosewood',
        weight: '3.5g',
        type: 'Cream'
      },
      isAdded: false
    },
    {
      id: 3,
      name: 'Eyeshadow Palette',
      price: 65,
      imagePath: 'assets/images/products/palette.jpg',
      description: '12 versatile shades with matte and shimmer finishes',
      details: {
        weight: '15g',
        type: 'Pressed powder'
      },
      isAdded: false
    },
    {
      id: 4,
      name: 'Mascara',
      price: 26,
      imagePath: 'assets/images/products/mascara.jpg',
      description: 'Lengthening and volumizing formula',
      details: {
        weight: '10ml',
        type: 'Liquid'
      },
      isAdded: false
    },
    {
      id: 5,
      name: 'Blush Duo',
      price: 34,
      imagePath: 'assets/images/products/blush.jpg',
      description: 'Matte and shimmer pairing for customizable glow',
      details: {
        shade: 'Peachy Keen',
        weight: '8g',
        type: 'Pressed powder'
      },
      isAdded: false
    }
  ];

  toggleCart(product: Product): void {
    product.isAdded = !product.isAdded;
  }

  showDetails(product: Product): void {
    console.log('Showing details for', product.name);
    // You can implement a modal here to show full product details
  }
}