import { Routes } from '@angular/router';
import { ApplicationRoutes } from './const/application-routes'; 
import { isLoggedInGuard } from './shared/guards/is-logged-in.guard';
import { isNotLoggedInGuard } from './shared/guards/is-not-logged-in.guard';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateDriveComponent } from './pages/create-drive/create-drive.component';
import { DriveListComponent } from './pages/drive-list/drive-list.component';
import { DriveDetailsComponent } from './pages/drive-details/drive-details.component';
import { DrivesNewComponent } from './pages/drives-new/drives-new.component';
import { DrivesMyComponent } from './pages/drives-my/drives-my.component';

export const routes: Routes = [
    {
      path: `${ApplicationRoutes.Dashboard}`,    
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
          (c) => c.UserProfileComponent 
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        },
    },
    {
      path: `${ApplicationRoutes.UserList}`,
      loadComponent: () =>
        import('./pages/user-list/user-list.component').then(
          (c) => c.UserListComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        }
    },
    {
      path: `${ApplicationRoutes.UesrDetails}/:id`,
      loadComponent: () =>
        import('./pages/user-details/user-details.component').then(
          (c) => UserDetailsComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        },
    },
    {
      path: `${ApplicationRoutes.CreateDrive}`,
      loadComponent: () =>
        import('./pages/create-drive/create-drive.component').then(
          (c) => CreateDriveComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        },
    },
    {
      path: `${ApplicationRoutes.AllDrives}`,
      loadComponent: () =>
        import('./pages/drive-list/drive-list.component').then(
          (c) => DriveListComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        }
    },
    {
      path: `${ApplicationRoutes.MyDrives}`,
      loadComponent: () =>
        import('./pages/drives-my/drives-my.component').then(
          (c) => DrivesMyComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        }
    },
    {
      path: `${ApplicationRoutes.NewDrives}`,
      loadComponent: () =>
        import('./pages/drives-new/drives-new.component').then(
          (c) => DrivesNewComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        }
    },
    {
      path: `${ApplicationRoutes.DriveDetails}/:id`,
      loadComponent: () =>
        import('./pages/drive-details/drive-details.component').then(
          (c) => DriveDetailsComponent
        ),
        canActivate: [isLoggedInGuard],
        data: {
          showHeader: true,
        },
    },
    {
      path: `${ApplicationRoutes.VerifyEmail}`,
      loadComponent: () =>
        import('./pages/verify-email/verify-email.component').then(
          (c) => c.VerifyEmailComponent 
        ),
        canActivate: [isNotLoggedInGuard],
        data: {
          showHeader: false,
        },
    },
    {
      path: '**',
      redirectTo: `${ApplicationRoutes.Dashboard}`,
      pathMatch: 'full',
    },
  ];