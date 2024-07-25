import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';
import { IUserProfileResponse } from '../../shared/models/user/userProfileResponse';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';

@Component({
  selector: 'user-profile',
  standalone: true,
  imports: [
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgIf,
    CommonModule,    
    FormsModule,    
    MatInputModule,
    MatSelectModule,
    MatButtonModule    
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected appRoutes = ApplicationRoutes;
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected editProfileForm!: FormGroup;
  protected isLoading: boolean = false;
  protected today = new Date();
  protected isEditMode : boolean = false;
  
  protected email!: string;
  protected roleName!: string;
  protected status!: string;

  public currentProfile: IUserProfileResponse | undefined;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) { }


  ngOnInit(): void {
    this.getUserProfile().subscribe(() => console.log('2'));
    console.log('1');

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  protected saveChanges() {
    if (this.editProfileForm.invalid) {
      return;
    }

    const updateProfileData = {
      ...this.editProfileForm.value,
    };
      
    this.userService.updateUserProfile(updateProfileData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.isEditMode = false;
        this.router.navigate([`${this.appRoutes.Profile}`]);
      },
    });
  }

  protected enableEditing() {
    this.isEditMode = true;
  }

  private getUserProfile(): Observable<IUserProfileResponse> {
    this.isLoading = true;
    return this.userService.getLoggedInUser().pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => { 
        this.currentProfile = res;
        this.editProfileForm = this.formBuilder.group(
          {
            username: new FormControl(res.username, Validators.required),
            name: new FormControl(res.name, Validators.required),
            surname: new FormControl(res.surname, Validators.required),
            address: new FormControl(res.address, Validators.required),
            dateOfBirth: new FormControl(res.dateOfBirth, [Validators.required]),
          }
        )
        
        this.email = res.email;
        this.roleName = res.roleNames[0];
        this.status = res.status;

        this.isLoading = false;
       })
    );
  }
}
