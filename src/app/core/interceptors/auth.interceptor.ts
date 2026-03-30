import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if document exists (prevents SSR server crashes)
  if (typeof document !== 'undefined') {
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
      return null;
    };

    const token = getCookie('token');

    // If token is found in the cookie, magically attach it to ALL HTTP requests
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }
  
  // If no token, just proceed normally
  return next(req);
};
