import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { valuesGreaterThanZeroValidator } from './valuesGreatterThanZero';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DriveService } from '../../shared/services/drive/drive.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { ICreatedDriveResponse } from '../../shared/models/drive/createdDriveResponse';
import { ApplicationRoutes } from '../../const/application-routes';
import { Router } from '@angular/router';

@Component({
  selector: 'create-drive',
  standalone: true,
  imports: [
    NgIf,
    SpinnerComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './create-drive.component.html',
  styleUrl: './create-drive.component.scss'
})
export class CreateDriveComponent implements OnInit { // Ovde ce se valjda komplet logika menjati kad se mape ubace
  protected appRoutes = ApplicationRoutes;
  protected createDriveForm!: FormGroup;
  protected driveCreated: boolean = false;  
  protected isLoading: boolean = false;
  protected driveResponse!: ICreatedDriveResponse;

  constructor(
    private formBuilder: FormBuilder,
    private driveService: DriveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.driveCreated = false;
    this.createDriveForm = this.formBuilder.group(
      {
        fromAddress: new FormControl('', Validators.required),
        toAddress:  new FormControl('', Validators.required),
        distance:  new FormControl('', Validators.required),
        estimatedDuration: new FormControl('', Validators.required)
      },
      { validators: valuesGreaterThanZeroValidator}
    )
  }

  protected createDrive() : void {
    this.isLoading = true;
    this.driveCreated = false;
    if (this.createDriveForm.invalid) {
      return;
    }

    const createDriveData = {
      ...this.createDriveForm.value,
    };

    this.driveService.createDrive(createDriveData).subscribe({
      next: (data: ICreatedDriveResponse) => {
        console.log(data);
        this.driveResponse = data;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {        
        this.driveCreated = true;
        this.isLoading = false;
      }      
    });
  }

  protected acceptDrive() : void {
    this.driveService.confirmDrive(this.driveResponse.id).subscribe({
      next: (data: any) => {
        console.log(data);        
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {                
        this.isLoading = false;
        this.router.navigate([`${this.appRoutes.Dashboard}`]);    // ovde treba da se zakljuca sistem ceo, lol
      }   
    })
  }

  protected declineDrive() {
    this.router.navigate([`${this.appRoutes.Dashboard}`]);
    // this.router.navigate([`${this.appRoutes.CreateDrive}`]); // kako da se redirektuje na istu, i da li treba ikad uopste
  }
}
