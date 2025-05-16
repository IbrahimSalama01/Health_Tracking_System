import { Routes } from '@angular/router';
import { LandingPageComponent } from './Features/landing-page/landing-page.component';
import { MainLayoutComponent } from './Core/Layout/main-layout/main-layout.component';
import { authGuard } from './Core/Auth/auth.guard';
import { patientGuard } from './Features/Dashboard/Patient/patient.guard';
import { doctorGuard } from './Features/Dashboard/Doctor/doctor.guard';
import { loggedInGuard } from './Core/Auth/logged-in.guard';
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
        c => c.SignupComponent),
        canActivate:[loggedInGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Core/Auth/login/login.component').then(
        c => c.LoginComponent),
        canActivate:[loggedInGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./Core/Auth/forgot-password/forgot-password.component').then(
        c => c.ForgotPasswordComponent),
        canActivate:[loggedInGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./Features/Dashboard/dashboard/dashboard.component').then(
        c => c.DashboardComponent
      ),
    canActivate: [authGuard,patientGuard],
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
      {
    path: 'doctor',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./Features/Dashboard/Doctor/statistics/statistics.component').then(c => c.StatisticsComponent),
      },
      {
        path: 'current-patients',
        loadComponent: () =>
          import('./Features/Dashboard/Doctor/current-patients/current-patients.component').then(c => c.CurrentPatientsComponent),
        canActivate: [doctorGuard],
      },
      {
        path: 'patientdetails/:id',
        loadComponent: () =>
          import('./Features/Dashboard/Doctor/patient-details/patient-details/patient-details.component').then(c => c.PatientDetailsComponent),
      }
    ]
    },
    ],
  },
];
