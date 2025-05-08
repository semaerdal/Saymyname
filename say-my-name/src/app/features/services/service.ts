// src/app/features/cart/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../shared/models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cart = new BehaviorSubject<CartItem[]>([]);
  
  cart$ = this.cart.asObservable();

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.cart.next([...this.cartItems]);
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cart.next([...this.cartItems]);
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cart.next([...this.cartItems]);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product.price * item.quantity), 0
    );
  }

  clearCart(): void {
    this.cartItems = [];
    this.cart.next([]);
  }
}