import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IGX_GRID_DIRECTIVES
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { ReportsService, HistoryItem } from '../../services/reports.service';

@Component({
  selector: 'app-borrowing-history',
  standalone: true,
  imports: [
    CommonModule,
    IGX_GRID_DIRECTIVES
  ],
  templateUrl: './borrowing-history.component.html',
  styleUrls: ['./borrowing-history.component.scss']
})
export class BorrowingHistoryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public activityHistory: HistoryItem[] = [];
  public isLoading = false;

  constructor(
    private reportsService: ReportsService
  ) {}

  ngOnInit() {
    this.loadActivityHistory();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadActivityHistory() {
    this.isLoading = true;
    this.reportsService.getActivityHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.activityHistory = data.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading activity history:', error);
          this.isLoading = false;
        }
      });
  }

  public formatDate(date: Date | string): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  public getActionClass(action: string): string {
    switch (action.toLowerCase()) {
      case 'request:create':
      case 'request:auto-approve':
        return 'action-request';
      case 'request:approve':
        return 'action-approve';
      case 'request:reject':
        return 'action-reject';
      case 'return':
        return 'action-return';
      default:
        return 'action-default';
    }
  }
}
