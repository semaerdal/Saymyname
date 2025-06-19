import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);
  
  cart$ = this.cartSubject.asObservable();

  add(product: Product): void {
    this.cartItems.push(product);
    this.cartSubject.next([...this.cartItems]);
  }

  remove(index: number): void {
    this.cartItems.splice(index, 1);
    this.cartSubject.next([...this.cartItems]);
  }

  clear(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }
}