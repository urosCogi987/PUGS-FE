import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';
import { AuthenticationService } from '../../shared/services/authentication/authentication.service';
import { tap } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {  
  protected appRoutes = ApplicationRoutes;
  protected loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
      ]),
    });
  }  

  protected login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .loginUser({ email, password })
      .pipe(
        tap({
          next: () => console.log('[next] Called'),
          error: (response) => console.log(response),
          complete: () => {
            console.log('Login');
            this.router.navigate([`${this.appRoutes.Dashboard}`]);
          },
        })
      )
      .subscribe();
  }
}
