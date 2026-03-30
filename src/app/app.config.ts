import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom(CarouselModule),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      easeTime: 300,
      preventDuplicates: true,
      newestOnTop: true,
      maxOpened: 3,
      resetTimeoutOnDuplicate: true
    })
  ]
};
