import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Check if token exists in cookies
  const hasToken = document.cookie.includes('token=');
  
  if (hasToken) {
    return true;
  }
  
  // Redirect to login if not authenticated
  return router.navigate(['/login']);
};
