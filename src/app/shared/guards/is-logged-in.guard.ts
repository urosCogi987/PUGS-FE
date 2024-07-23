import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service'; 
import { ApplicationRoutes } from '../../const/application-routes';

export const isLoggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const appRoutes = ApplicationRoutes;

  return authService.isLoggedIn.pipe(
    take(1),
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        router.navigate([`/${appRoutes.Login}`]);
        return false;
      }
      return true;
    })
  );
};