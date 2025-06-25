import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private firestore: Firestore = inject(Firestore);

    getProducts(): Observable<Product[]> {
        const productsCollection = collection(this.firestore, 'products'); // 'products' ist der Collection-Name in Firebase
        return collectionData(productsCollection, { idField: 'id' }) as Observable<Product[]>;
    }
}