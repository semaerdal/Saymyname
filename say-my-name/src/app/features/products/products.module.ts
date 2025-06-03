import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ProductPageComponent 
  ]
})
export class ProductsModule { 
    
}