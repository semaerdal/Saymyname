import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/services/product.service';
import { Observable, map } from 'rxjs';

interface ProductDetails {
  shade?: string;
  weight: string;
  type: string;
}

interface ProductExtended {
  id?: string;
  name: string;
  price: number;
  description: string;
  imagePath: string;
  isAdded: boolean;
  details: ProductDetails;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  private productService = inject(ProductService);
  
  products$: Observable<ProductExtended[]> = this.productService.getProducts().pipe(
    map(products => products.map(product => ({
      ...product,
      isAdded: false,
      details: {
        weight: 'N/A',
        type: 'N/A',
        ...(product as any).details
      }
    })))
  );

  toggleCart(product: ProductExtended): void {
    product.isAdded = !product.isAdded;
  }
}