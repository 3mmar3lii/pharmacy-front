import { Routes } from '@angular/router';
import { Auth } from './core/layout/auth-layout/auth';
import { User } from './core/layout/user-layout/user';
import { Login } from './core/auth/component/login/login';
import { Register } from './core/auth/component/register/register';
import { Home } from './feature/home/component/home/home';
import { ProductList } from './feature/product/component/product-list/product-list';
import { NotFound } from './core/auth/component/not-found/not-found';
import { ProductDetails } from './feature/product/component/product-details/product-details';

export const routes: Routes = [
  // {path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: '', component: Auth, children: [
      // { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      // {path: '**', component:NotFound },
    ],
  },
  {
    path: '', component: User, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home },
      { path: 'product', component: ProductList },
      { path: 'product-details/:id', component: ProductDetails },
      {path: '**', component:NotFound },
    ],
  },

];
