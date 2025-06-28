import { RouterModule, Routes } from '@angular/router';

//Navigation aller Seiten, Routen

export const routes: Routes = [

  // Startseite
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  {
    path: 'home', 
    title: 'SayMyName - Home',
    loadComponent: () => import('./features/public/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'products',
    title: 'Produkte',
    loadComponent: () => import('./features/public/products/product-page/product-page.component').then(m => m.ProductPageComponent)
  },
{ 
    path: 'cart',
    title: 'Warenkorb',
    loadComponent: () => import('./features/public/cart/cart.component').then(m => m.CartComponent)
  },

  // Authentifizierung
  { 
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./features/public/login/login.component').then(m => m.LoginComponent)
  },

  // Account
  { 
    path: 'account',
    title: 'My Account',
    loadComponent: () => import('./features/private/account/account.component').then(m => m.AccountComponent)
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


  // Wildcard route (zu home)
  { path: '**', redirectTo: 'home' }
];

