import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { forkJoin, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IUserDetailsResponse } from '../../shared/models/user/userDetailsResponse';
import { ActivatedRoute } from '@angular/router';
import { IProfilePictureResponse } from '../../shared/models/user/profilePictureResponse';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy{
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected user!: IUserDetailsResponse;
  protected imageSrc!: string;
  protected isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  ngOnInit(): void {    
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    forkJoin([this.getUserDetails(id!), this.getUserProfilePicture(id!)]).subscribe(() => {
      this.isLoading = false;
    });    
  }

  private getUserDetails(id: string): Observable<IUserDetailsResponse> {
    return this.userService.userDetails(id).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.user = res;
      })
    )
  }

  private getUserProfilePicture(id: string): Observable<IProfilePictureResponse> {
    return this.userService.getBase64Image(id).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.imageSrc = `data:${res.contentType};base64,${res.base64}`;        
      })
    )
  }
}
