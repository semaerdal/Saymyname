import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    title: 'SayMyName - Home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'products',
    title: 'Produkte',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  // Auth routes
  { 
    path: 'login',
    title: 'Login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  { 
    path: 'register',
    title: 'Registrieren',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },

  // Account section
  { 
    path: 'account',
    title: 'My Account',
    loadComponent: () => import('./features/account/account.component').then(m => m.AccountComponent)
  },

  // Static pages
  { 
    path: 'about',
    title: 'About Us',
    loadComponent: () => import('./features/static/about-us/about-us.component').then(m => m.AboutUsComponent)
  },
  { 
    path: 'impressum',
    title: 'Impressum',
    loadComponent: () => import('./features/static/impressum/impressum.component').then(m => m.ImpressumComponent)
  },
  { 
    path: 'kontakt',
    title: 'Contact Us',
    loadComponent: () => import('./features/static/kontaktformular/kontaktformular.component').then(m => m.KontaktformularComponent)
  },

  // Wildcard route (fallback to home)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
