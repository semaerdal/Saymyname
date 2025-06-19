import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<Product[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cart$;
  }

  removeItem(index: number): void {
    // Implementierung folgt
  }

  getTotal(items: Product[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }
}