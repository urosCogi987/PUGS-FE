import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { ApplicationRoutes } from './const/application-routes';
import { RouteDataService } from './shared/services/route-data/route-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  protected appRoutes = ApplicationRoutes;
  protected showHeader$!: Observable<boolean>;
  public title = 'taxiApp';

  constructor(
    private router: Router,
    private routeDataService: RouteDataService
  ) {}

  ngOnInit() {
    this.showHeader$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.routeDataService.getRouteData()['showHeader'] !== false)
    );
  }
}
