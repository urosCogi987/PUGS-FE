import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatGridListModule, 
    MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected appRoutes = ApplicationRoutes;
}
