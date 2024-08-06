import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationRoutes } from '../../const/application-routes';
import { Subject, takeUntil, tap } from 'rxjs';
import { IDriveListItemResponse } from '../../shared/models/drive/driveListItemResponse';
import { DriveService } from '../../shared/services/drive/drive.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'drives-my',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    SpinnerComponent
  ],
  templateUrl: './drives-my.component.html',
  styleUrl: './drives-my.component.scss'
})
export class DrivesMyComponent implements OnInit, OnDestroy {
  protected appRoutes = ApplicationRoutes; 
  private ngUnsubscribe: Subject<void> = new Subject<void>;
  protected drives!: IDriveListItemResponse[];
  protected isLoading: boolean = false;

  constructor(private driveService: DriveService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getDriveListForUser().subscribe(() => {
      this.isLoading = false;
    });
  }

  private getDriveListForUser() {
    return this.driveService.getDrivesForUser().pipe(
      takeUntil(this.ngUnsubscribe),
      tap((res) => {
        this.drives = res;
      })
    )
  }  

  protected transformStatus(status: string): string {
    if (!status) return status;

    return status
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, str => str.toUpperCase());
  }
}
