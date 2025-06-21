// src/app/models/product.model.ts
export interface Product {
  id?: string; // Firebase fügt die ID automatisch hinzu
  name: string;
  price: number;
  description: string;
  imagePath: string;
  // Weitere Felder nach Bedarf
}