import { Routes } from '@angular/router';
import { User } from './core/layout/user-layout/user';
import { Home } from './feature/home/component/home/home';
import { ProductList } from './feature/product/component/product-list/product-list';
import { NotFound } from './core/auth/component/not-found/not-found';
import { ProductDetails } from './feature/product/component/product-details/product-details';
import { CartComponent } from './feature/cart/component/cart/cart.component';
import { ProfileComponent } from './feature/profile/component/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: '',
    component: User,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'product', component: ProductList },
      { path: 'product-details/:id', component: ProductDetails },
      { path: 'cart', component: CartComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '**', component: NotFound },
    ],
  },
];
