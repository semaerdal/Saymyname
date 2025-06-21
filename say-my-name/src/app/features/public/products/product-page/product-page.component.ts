// features/public/products/product-page/product-page.component.ts
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
  imageUrl: string;
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
        // You can add default shade if needed
        ...(product as any).details // Spread any existing details from Firestore
      }
    })))
  );

  toggleCart(product: ProductExtended): void {
    product.isAdded = !product.isAdded;
  }

  showDetails(product: ProductExtended): void {
    console.log('Product details:', product);
    // Implement modal or detailed view here
  }
}