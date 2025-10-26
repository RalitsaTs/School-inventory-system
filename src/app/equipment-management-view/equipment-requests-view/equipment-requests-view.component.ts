import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IgxGridModule, 
  IgxButtonDirective, 
  IgxRippleDirective, 
  IgxIconComponent,
  IgxSnackbarComponent 
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EquipmentRequestService } from '../../services/equipment-request.service';
import { EquipmentRequest } from '../../models/api/equipment-request.model';

@Component({
  selector: 'app-equipment-requests-view',
  standalone: true,
  imports: [
    CommonModule,
    IgxGridModule,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconComponent,
    IgxSnackbarComponent
  ],
  templateUrl: './equipment-requests-view.component.html',
  styleUrls: ['./equipment-requests-view.component.scss']
})
export class EquipmentRequestsViewComponent implements OnInit, OnDestroy {
  @ViewChild('snackbar', { static: true }) snackbar: any;

  private destroy$: Subject<void> = new Subject<void>();
  public allRequests: EquipmentRequest[] = [];

  constructor(
    private equipmentRequestService: EquipmentRequestService
  ) {}

  ngOnInit() {
    this.loadAllRequests();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllRequests() {
    this.equipmentRequestService.getAllRequests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (requests) => {
          this.allRequests = requests.sort((a, b) => 
            new Date(b.requestedAt || 0).getTime() - new Date(a.requestedAt || 0).getTime()
          );
        },
        error: (error) => {
          console.error('Error loading requests:', error);
          this.snackbar?.open('Error loading requests');
        }
      });
  }

  public formatDate(date: string | Date | null | undefined): string {
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

  public getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      case 'Returned': return 'status-returned';
      default: return '';
    }
  }

  public approveRequest(request: EquipmentRequest) {
    if (!request.id) return;

    this.equipmentRequestService.approveRequest(request.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedRequest) => {
          const index = this.allRequests.findIndex(r => r.id === request.id);
          if (index !== -1) {
            this.allRequests[index] = updatedRequest;
          }
          this.snackbar?.open('Request approved successfully');
        },
        error: (error) => {
          console.error('Error approving request:', error);
          this.snackbar?.open('Error approving request');
        }
      });
  }

  public rejectRequest(request: EquipmentRequest) {
    if (!request.id) return;

    this.equipmentRequestService.rejectRequest(request.id, { notes: 'Rejected by admin' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedRequest) => {
          const index = this.allRequests.findIndex(r => r.id === request.id);
          if (index !== -1) {
            this.allRequests[index] = updatedRequest;
          }
          this.snackbar?.open('Request rejected');
        },
        error: (error) => {
          console.error('Error rejecting request:', error);
          this.snackbar?.open('Error rejecting request');
        }
      });
  }
}
