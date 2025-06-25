export interface Product {
  id?: string; 
  name: string;
  price: number;
  description: string;
  imagePath: string;
}

// Fragezeichen ? damit Firebaseautomatisch die ID macht