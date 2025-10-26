import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IgxGridModule, 
  IgxButtonDirective, 
  IgxRippleDirective, 
  IgxIconComponent,
  IgxSnackbarComponent,
  IgxDialogModule,
  IGX_INPUT_GROUP_DIRECTIVES 
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EquipmentRequestService } from '../../services/equipment-request.service';
import { EquipmentRequest, ReturnRequest } from '../../models/api/equipment-request.model';
import { RequestStatus, Condition, EquipmentStatus } from '../../models/api/enums';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IgxGridModule,
    IgxButtonDirective,
    IgxRippleDirective,
    IgxIconComponent,
    IgxSnackbarComponent,
    IgxDialogModule,
    IGX_INPUT_GROUP_DIRECTIVES
  ],
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit, OnDestroy {
  @ViewChild('returnDialog', { static: true }) returnDialog: any;
  @ViewChild('snackbar', { static: true }) snackbar: any;

  private destroy$: Subject<void> = new Subject<void>();
  public myRequests: EquipmentRequest[] = [];
  public selectedRequest: EquipmentRequest | null = null;
  public returnCondition: Condition = Condition.Good;
  public returnStatus: EquipmentStatus = EquipmentStatus.Available;
  public returnNotes = '';

  constructor(
    private equipmentRequestService: EquipmentRequestService
  ) {}

  ngOnInit() {
    this.loadMyRequests();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMyRequests() {
    this.equipmentRequestService.getMyRequests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (requests) => {
          this.myRequests = requests.sort((a, b) => 
            new Date(b.requestedAt || 0).getTime() - new Date(a.requestedAt || 0).getTime()
          );
        },
        error: (error) => {
          console.error('Error loading my requests:', error);
          this.snackbar?.open('Error loading requests. Please try again.');
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

  public truncateText(text: string | null | undefined, length: number): string {
    if (!text) return '-';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  public openReturnDialog(request: EquipmentRequest) {
    this.selectedRequest = request;
    this.returnCondition = Condition.Good;
    this.returnStatus = EquipmentStatus.Available;
    this.returnNotes = '';
    this.returnDialog.open();
  }

  public submitReturn() {
    if (!this.selectedRequest || !this.returnCondition || !this.returnStatus) {
      return;
    }

    const returnRequest: ReturnRequest = {
      condition: this.returnCondition,
      status: this.returnStatus,
      notes: this.returnNotes.trim() || undefined
    };

    this.equipmentRequestService.returnEquipment(this.selectedRequest.id!, returnRequest)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.snackbar?.open('Equipment returned successfully!');
          this.returnDialog.close();
          this.loadMyRequests(); // Refresh the list
        },
        error: (error) => {
          console.error('Error returning equipment:', error);
          this.snackbar?.open('Error returning equipment. Please try again.');
        }
      });
  }
}