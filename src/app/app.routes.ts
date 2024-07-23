import { Routes } from '@angular/router';
import { ApplicationRoutes } from './const/application-routes'; 
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { isNotLoggedInGuard } from './shared/guards/is-not-logged-in.guard';

export const routes: Routes = [
    {
      path: '',      
      loadComponent: () =>
        import('./pages/dashboard/dashboard.component').then(
          (c) => c.DashboardComponent
        ),
      canActivate: [isLoggedInGuard],
      data: {
        showHeader: true,
      },
    },
    {
      path: `${ApplicationRoutes.Registration}`,
      loadComponent: () =>
        import('./pages/register/register.component').then(
          (c) => c.RegisterComponent
        ),
      canActivate: [isNotLoggedInGuard],
      data: {
        showHeader: false,
      },
    },
    {
      path: `${ApplicationRoutes.Login}`,
      loadComponent: () =>
        import('./pages/login/login.component').then(
          (c) => c.LoginComponent
        ),
      canActivate: [isNotLoggedInGuard],
      data: {
        showHeader: false,
      },
    },
    {
      path: `${ApplicationRoutes.Profile}`,
      loadComponent: () =>
        import('./pages/user-profile/user-profile.component').then(
          (c) => c.UserProfileComponent // puca kada ima constructor ... ?
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        },
    },
    {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
    },
  ];