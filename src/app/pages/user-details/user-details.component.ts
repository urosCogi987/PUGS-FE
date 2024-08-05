import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user/user.service';
import { forkJoin, Observable, Subject, takeUntil, tap } from 'rxjs';
import { IUserDetailsResponse } from '../../shared/models/user/userDetailsResponse';
import { ActivatedRoute } from '@angular/router';
import { IProfilePictureResponse } from '../../shared/models/user/profilePictureResponse';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISetUserStatusRequest } from '../../shared/models/user/setUserStatusRequest';

interface IStatuses {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'user-details',
  standalone: true,
  imports: [
    SpinnerComponent,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule 
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy{
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected user!: IUserDetailsResponse;
  protected imageSrc!: string;
  protected isLoading: boolean = false;  
  protected setStatusForm!: FormGroup;
  protected selectedStatus!: string;
  protected userId!: string;
  protected statuses: IStatuses[] = [
    { value: 'Active', viewValue: 'Active' },
    { value: 'Blocked', viewValue: 'Blocked' },
  ];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder    
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  ngOnInit(): void {    
    this.isLoading = true;
    this.userId = this.route.snapshot.paramMap.get('id') || "";
    forkJoin([this.getUserDetails(this.userId), this.getUserProfilePicture(this.userId)]).subscribe(() => {
      this.isLoading = false;
    });    

    this.setStatusForm = this.formBuilder.group({
      userStatus: new FormControl('', Validators.required),       
    });

    // Listen to value changes on the 'status' form control
    this.setStatusForm.get('userStatus')?.valueChanges.subscribe(selectedStatus => {
      if (selectedStatus) {
        this.sendStatusChangeRequest(selectedStatus);
      }
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

  sendStatusChangeRequest(status: string): void {    
    const requestBody: ISetUserStatusRequest = { userStatus: status };
    this.userService.setStatus(this.userId, requestBody).subscribe(()  => {      
    });  
  }
}
