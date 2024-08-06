import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationRoutes } from '../../const/application-routes';
import { Subject, takeUntil, tap } from 'rxjs';
import { IDriveListItemResponse } from '../../shared/models/drive/driveListItemResponse';
import { DriveService } from '../../shared/services/drive/drive.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-drives-new',
  standalone: true,
  imports: [
    MatTableModule,
    RouterModule,
    SpinnerComponent
  ],
  templateUrl: './drives-new.component.html',
  styleUrl: './drives-new.component.scss'
})
export class DrivesNewComponent implements OnInit, OnDestroy {
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
    this.getNewDrives().subscribe(() => {
      this.isLoading = false;
    });
  }

  private getNewDrives() {
    return this.driveService.getNewDrives().pipe(
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
