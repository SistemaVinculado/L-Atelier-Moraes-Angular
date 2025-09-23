

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';
import { AppComponent } from './src/app.component';
import { routes } from './src/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
  ],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.