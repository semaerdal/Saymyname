import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private firestore: Firestore = inject(Firestore);

    // Firebase "products" Infos abgerufen
    getProducts(): Observable<Product[]> {
        const productsCollection = collection(this.firestore, 'products');
        return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
    }
}