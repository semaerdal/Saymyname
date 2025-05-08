// src/app/shared/models/product.model.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string;
    stock: number;
  }