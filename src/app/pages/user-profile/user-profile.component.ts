import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
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
import { repeatPasswordValidator } from './repeatPassword';
import {MatToolbarModule} from '@angular/material/toolbar';
import { IProfilePictureResponse } from '../../shared/models/user/profilePictureResponse';

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
    MatButtonModule,
    MatToolbarModule    
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  protected appRoutes = ApplicationRoutes;
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected editProfileForm!: FormGroup;
  protected changePasswordForm!: FormGroup; 

  protected imageSrc!: string;
  protected selectedFile?: File;
  protected selectedFileName?: string;
  protected imageUrl: string | ArrayBuffer | null = null;

  protected isLoading: boolean = false;
  protected today = new Date();

  protected isEditMode : boolean = false;
  protected isChangingPasswordMode : boolean = false;
  
  protected email!: string;
  protected roleName!: string;
  protected status!: string;  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService    
  ) { }
    

  ngOnInit(): void {    
    this.getUserProfile().subscribe();     
    this.getUserProfilePicture().subscribe();    
    this.isEditMode = false;
    this.isChangingPasswordMode = false;
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

  protected changePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const changePasswordData = {
      ...this.changePasswordForm.value,
    };
      
    this.userService.changePassword(changePasswordData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.isChangingPasswordMode = false;                                 
        this.router.navigate([`${this.appRoutes.Profile}`]);
        this.resetForm();
      },
    });
  }

  protected enableChangePassword() {
    this.isChangingPasswordMode = true;
  }
  
  protected enableEditing() {
    this.isEditMode = true;
  }

  protected changePicture() {
    if (!this.selectedFile) {      
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.userService.uploadImage(formData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.isChangingPasswordMode = false;                                 
        this.router.navigate([`${this.appRoutes.Profile}`]);
        this.resetForm();
      },
    });
  }

  protected onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];      
    }
  }

  private resetForm() {
    this.changePasswordForm.reset(); 
    this.changePasswordForm.clearValidators();
  }
  
  private getUserProfilePicture(): Observable<IProfilePictureResponse> {
    return this.userService.getBase64Image(null).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.imageSrc = `data:${res.contentType};base64,${res.base64}`;        
      })
    )
  }
  
  private getUserProfile(): Observable<IUserProfileResponse> {
    this.isLoading = true;
    return this.userService.getLoggedInUser().pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {         
        this.editProfileForm = this.formBuilder.group(
          {
            username: new FormControl(res.username, Validators.required),
            name: new FormControl(res.name, Validators.required),
            surname: new FormControl(res.surname, Validators.required),
            address: new FormControl(res.address, Validators.required),
            dateOfBirth: new FormControl(res.dateOfBirth, Validators.required),
          }
        )
        
        this.changePasswordForm = this.formBuilder.group(
          {
            password: new FormControl('', [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(50),
            ]),
            repeatPassword: new FormControl('', Validators.required),
            oldPassword: new FormControl('', Validators.required)
          },
          { validators: repeatPasswordValidator }
        )

        this.email = res.email;
        this.roleName = res.roleNames[0];
        this.status = res.status;

        this.isLoading = false;
       })
    );
  }

}
