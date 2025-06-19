import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', 
    title: 'SayMyName - Home',
    loadChildren: () => import('./features/public/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'products',
    title: 'Produkte',
    loadChildren: () => import('./features/public/products/products.module').then(m => m.ProductsModule)
  },
  // Auth routes
  { 
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./features/public/login/login.component').then(m => m.LoginComponent)
  },

  // Account section
  { 
    path: 'account',
    title: 'My Account',
    loadComponent: () => import('./features/private/account/account.component').then(m => m.AccountComponent)
  },

 { 
    path: 'cart',
    title: 'Cart',
    loadComponent: () => import('./features/private/cart/cart.component').then(m => m.CartComponent),
    
  },

  // Static pages
  { 
    path: 'about',
    title: 'About Us',
    loadComponent: () => import('./features/public/static/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  { 
    path: 'impressum',
    title: 'Impressum',
    loadComponent: () => import('./features/public/static/impressum/impressum.component').then(m => m.ImpressumComponent)
  },
  { 
    path: 'kontakt',
    title: 'Contact Us',
    loadComponent: () => import('./features/public/static/kontaktformular/kontaktformular.component').then(m => m.KontaktformularComponent)
  },

  // Wildcard route (fallback to home)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
