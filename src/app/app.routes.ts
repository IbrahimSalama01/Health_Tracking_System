import { Routes } from '@angular/router';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';

export const routes: Routes = [
  {path: '', component:LandingPageComponent},
  {path: 'contact-us', loadComponent: () => import('./Features/contact-us/contact-us.component').then(c => c.ContactUsComponent)},
  {path: 'privacy-policy', loadComponent: () => import('./Features/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent)},
  {path: 'dashboard', loadComponent: () => import('./Features/Dashboard/dashboard/dashboard.component').then(c => c.DashboardComponent),
    children:[
      {path:'',loadComponent: () => import('./Features/Dashboard/Patient/statistics/statistics.component').then(c => c.StatisticsComponent)},
      {path:'checkups',loadComponent: () => import('./Features/Dashboard/Patient/checkups/checkups.component').then(c => c.CheckupsComponent)},
      {path:'my-doctors',loadComponent: () => import('./Features/Dashboard/Patient/my-doctors/my-doctors.component').then(c => c.MyDoctorsComponent)}
    ] }

];
