import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { repeatPasswordValidator } from './repeatPassword';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { RegisterUser } from '../../../shared/models/registerUser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  protected selectedRole!: string;
  protected roles: Roles[] = [
    { value: 'user', viewValue: 'User' },
    { value: 'driver', viewValue: 'Driver' },
  ];

  registerForm: FormGroup = new FormGroup({
    userUsername: new FormControl('', Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userName: new FormControl('', Validators.required),
    userSurname: new FormControl('', Validators.required),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    userRepeatPassword: new FormControl('', [
      Validators.required,
      repeatPasswordValidator,
    ]),
    userAddress: new FormControl('', Validators.required),
    userRole: new FormControl('', Validators.required),
  });

  submitForm() {
    let user = new RegisterUser(
      this.registerForm.value.userUsername,
      this.registerForm.value.userName,
      this.registerForm.value.userSurname,
      this.registerForm.value.userAddress,
      new Date(),
      this.registerForm.value.userPassword,
      this.registerForm.value.userRepeatPassword,
      this.registerForm.value.userRole,
      this.registerForm.value.userEmail
    );

    this.authenticationService.registerUser(user).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (err: Error) => {
        console.log(err);
      },
    });
  }
}