import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  imports: [],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  dummyItems = [
    { name: 'Product 1', price: 10.99, quantity: 2 },
    { name: 'Product 2', price: 15.99, quantity: 1 }
  ];
  dummyTotal = 37.97;
}
