import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationRoutes } from '../../const/application-routes';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { DriveService } from '../../shared/services/drive/drive.service';
import { ActivatedRoute } from '@angular/router';
import { IDriveDetailsResponse } from '../../shared/models/drive/driveDetailsResponse';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'drive-details',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './drive-details.component.html',
  styleUrl: './drive-details.component.scss'
})
export class DriveDetailsComponent implements OnInit, OnDestroy {
  protected appRoutes = ApplicationRoutes; 
  private ngUnsubscribe: Subject<void> = new Subject<void>;  
  protected isLoading: boolean = false;  
  protected drive!: IDriveDetailsResponse;

  constructor(
    private driveService: DriveService,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.getDriveDetails(id!).subscribe(() => {
      this.isLoading = false;
    });
  }

  private getDriveDetails(id: string): Observable<IDriveDetailsResponse> {
    return this.driveService.driveDetails(id).pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.drive = res;
      })
    )
  }

  protected transformStatus(status: string): string {
    if (!status) return status;

    return status
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }

  protected acceptDrive() {
    this.isLoading = true;
    this.driveService.acceptDrive(this.drive.id).subscribe(() => {
      this.isLoading = false;
    });
  }
}
