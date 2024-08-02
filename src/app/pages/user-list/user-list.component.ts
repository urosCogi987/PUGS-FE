import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { IUserListItemResponse } from '../../shared/models/user/userListItemResponse';
import { ApplicationRoutes } from '../../const/application-routes';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  protected appRoutes = ApplicationRoutes; 
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected users!: IUserListItemResponse[];

  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
  
  ngOnInit(): void {
    this.getUserList().subscribe();
  }

  private getUserList() {
    return this.userService.userList().pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.users = res;
      })
    );
  }
}
