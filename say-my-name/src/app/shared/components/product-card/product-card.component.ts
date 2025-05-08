// src/app/shared/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../features/cart/services'; // Clean import via barrel file

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}