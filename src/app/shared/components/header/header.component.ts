import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ApplicationRoutes } from '../../../const/application-routes'; 
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected appRoutes = ApplicationRoutes;
  protected isLoggedIn = this.authService.isLoggedIn;

  constructor(private authService: AuthenticationService) {}

  protected logOut(): void {
    this.authService.logoutUser();
  }
}
