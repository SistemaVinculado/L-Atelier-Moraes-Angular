import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/case-studies/case-studies.component').then(m => m.CaseStudiesComponent)
  },
  {
    path: 'case-studies/:slug',
    loadComponent: () => import('./pages/case-study-detail/case-study-detail.component').then(m => m.CaseStudyDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  { path: '**', redirectTo: '' } // Redirect unknown paths to home
];
