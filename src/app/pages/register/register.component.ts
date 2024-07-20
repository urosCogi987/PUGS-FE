import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { repeatPasswordValidator } from './repeatPassword';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterModule, Router } from '@angular/router';
import { ApplicationRoutes } from '../../const/application-routes';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    RouterModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {   
  protected appRoutes = ApplicationRoutes; 
  protected today = new Date();
  protected registerForm!: FormGroup;
  protected selectedRole!: string;
  protected roles: Roles[] = [
    { value: 'User', viewValue: 'User' },
    { value: 'Driver', viewValue: 'Driver' },
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(50),
        ]),
        repeatPassword: new FormControl('', [Validators.required]),
        dateOfBirth: new FormControl('', [Validators.required]),
        address: new FormControl('', Validators.required),
        roleName: new FormControl('', Validators.required),
      },
      { validators: repeatPasswordValidator }
    );
  }
  
  submitForm() {    
    if (this.registerForm.invalid) {
      return;
    }

    const registrationData = {
      ...this.registerForm.value,
    };

    this.authenticationService.registerUser(registrationData).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        this.router.navigate([`${this.appRoutes.Login}`]);
      },
    });
  }
}