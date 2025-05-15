import { Routes } from '@angular/router';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';
import { MainLayoutComponent } from './Core/Layout/main-layout/main-layout.component';

export const routes: Routes = [

  { path: '', component: MainLayoutComponent, children: [
    {
      path: '',
      component: LandingPageComponent
    },
    {
      path: 'contact-us',
      loadComponent: () =>
        import('./Features/contact-us/contact-us.component').then(
          c => c.ContactUsComponent
        ),
    },
    {
      path: 'privacy-policy',
      loadComponent: () =>
        import('./Features/privacy-policy/privacy-policy.component').then(
          c => c.PrivacyPolicyComponent
        ),
    },
  ]
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./Core/Auth/signup/signup.component').then(
        c => c.SignupComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Core/Auth/login/login.component').then(
        c => c.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./Core/Auth/forgot-password/forgot-password.component').then(
        c => c.ForgotPasswordComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Features/Dashboard/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './Features/Dashboard/Patient/statistics/statistics.component'
          ).then(c => c.StatisticsComponent),
      },
      {
        path: 'checkups',
        loadComponent: () =>
          import(
            './Features/Dashboard/Patient/checkups/checkups.component'
          ).then(c => c.CheckupsComponent),
      },
      {
        path: 'my-doctors',
        loadComponent: () =>
          import(
            './Features/Dashboard/Patient/my-doctors/my-doctors.component'
          ).then(c => c.MyDoctorsComponent),
        children: [
          {
            path: 'requests',
            loadComponent: () =>
              import(
                './Features/Dashboard/Patient/my-doctors/requests/requests.component'
              ).then(c => c.RequestsComponent),
          },
          {
            path: 'prev-doctors',
            loadComponent: () =>
              import(
                './Features/Dashboard/Patient/my-doctors/prev-doctors/prev-doctors.component'
              ).then(c => c.PrevDoctorsComponent),
          },
          {
            path: 'accessed-doctors',
            loadComponent: () =>
              import(
                './Features/Dashboard/Patient/my-doctors/accessed-doctors/accessed-doctors.component'
              ).then(c => c.AccessedDoctorsComponent),
          },
        ],
      },
    ],
  },
];
