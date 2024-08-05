import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';
import { Observable, ObservableInput, Subject, takeUntil, tap } from 'rxjs';
import { IVerifyEmailRequest } from '../../shared/models/authentication/verifyEmailRequest';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'verify-email',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit, OnDestroy{
  protected appRoutes = ApplicationRoutes; 
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected emailVerificationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {    
    this.emailVerificationForm = this.formBuilder.group({      
        verificationToken: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8)
        ])
      }
    );
  }

  protected verifyEmail() : void {
    if (this.emailVerificationForm.invalid) {
      return;
    }

    const token = this.emailVerificationForm.value;

    this.authenticationService
      .verifyEmail(token)
      .pipe(
          takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate([`${this.appRoutes.Login}`]);
        },
        error: (err: Error) => {
          console.log(err);
        }
      });
  }

  protected resendToken() { console.log('sta bre') } 
}
