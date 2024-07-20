import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { ApplicationRoutes } from './const/application-routes'; 

export const routes: Routes = [
    {
      path: '',
      redirectTo: `${ApplicationRoutes.Registration}`,
      pathMatch: 'full',
    },
    {
      path: `${ApplicationRoutes.Login}`,
      component: LoginComponent,
    },
    {
      path: `${ApplicationRoutes.Registration}`,
      component: RegisterComponent,
    },
    {
      path: `${ApplicationRoutes.Dashboard}`,
      component: DashboardComponent,
    },
  ];