import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  protected appRoutes = ApplicationRoutes;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile()
    .pipe(
      tap({
        next: () => console.log('[next] Called'),
        error: (response) => console.log(response),
        complete: () => {          
          console.log('response'); // kako da vidim response???          
        },
      })
    )
    .subscribe();
  }  
}
