import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  dummyProducts = [
    { name: 'Product 1', price: 10.99 },
    { name: 'Product 2', price: 15.99 },
    { name: 'Product 3', price: 20.99 }
  ];
}
