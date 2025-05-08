import { Routes } from '@angular/router';
import path from 'path';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';
import { ContactUsComponent } from './Features/contact-us/contact-us.component';
import { AboutComponent } from './Features/landing-page/about/about.component';
import { ServiesComponent } from './Features/landing-page/servies/servies.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServiesComponent },
  { path: 'contacts', component: ContactUsComponent },
];
