import { LaraBaseDesignTokens } from './../../node_modules/@primeng/themes/lara/base/index.d';
import { NoraBaseDesignTokens } from './../../node_modules/@primeng/themes/nora/base/index.d';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
          preset:Aura,
          options:{
          darkModeSelector:'.my-app-dark'
      }
    }
  })
  ]
};
