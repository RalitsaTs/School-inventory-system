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
  template: `
    <div class="my-requests-container">
      <div class="header-section">
        <h2>My Equipment Requests</h2>
        <p>View and manage your equipment requests.</p>
      </div>

      <igx-grid 
        #grid 
        [data]="myRequests" 
        [allowFiltering]="true"
        [filterMode]="'excelStyleFilter'"
        height="600px"
        width="100%">
        
        <igx-column field="id" header="Request ID" [sortable]="true" [filterable]="true" width="100px"></igx-column>
        
        <igx-column field="equipment.name" header="Equipment" [sortable]="true" [filterable]="true" width="200px">
          <ng-template igxCell let-cell="cell">
            <div class="equipment-info">
              <strong>{{ cell.row.data.equipment?.name || 'N/A' }}</strong>
              <br>
              <small>{{ cell.row.data.equipment?.type || '' }}</small>
            </div>
          </ng-template>
        </igx-column>
        
        <igx-column field="requestedAt" header="Requested" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            {{ formatDate(cell.value) }}
          </ng-template>
        </igx-column>
        
        <igx-column field="start" header="Start Date" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            {{ formatDate(cell.value) }}
          </ng-template>
        </igx-column>
        
        <igx-column field="end" header="End Date" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            {{ formatDate(cell.value) }}
          </ng-template>
        </igx-column>
        
        <igx-column field="status" header="Status" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            <span [class]="getStatusClass(cell.value)" class="status-badge">
              {{ cell.value }}
            </span>
          </ng-template>
        </igx-column>
        
        <igx-column field="notes" header="Notes" [sortable]="false" [filterable]="true" width="150px">
          <ng-template igxCell let-cell="cell">
            <span [title]="cell.value">{{ truncateText(cell.value, 50) }}</span>
          </ng-template>
        </igx-column>
        
        <igx-column field="approvedAt" header="Approved" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            {{ cell.value ? formatDate(cell.value) : '-' }}
          </ng-template>
        </igx-column>
        
        <igx-column field="returnedAt" header="Returned" [sortable]="true" [filterable]="true" width="120px">
          <ng-template igxCell let-cell="cell">
            {{ cell.value ? formatDate(cell.value) : '-' }}
          </ng-template>
        </igx-column>
        
        <igx-column header="Actions" [sortable]="false" [filterable]="false" width="120px">
          <ng-template igxCell let-cell="cell">
            @if (cell.row.data.status === 'Approved' && !cell.row.data.returnedAt) {
              <button 
                igxButton="outlined" 
                igxRipple 
                (click)="openReturnDialog(cell.row.data)"
                title="Mark as returned">
                <igx-icon>assignment_return</igx-icon>
                Return
              </button>
            }
            @if (cell.row.data.status === 'Pending') {
              <span class="pending-info">Awaiting approval</span>
            }
          </ng-template>
        </igx-column>
      </igx-grid>

      <!-- Return Dialog -->
      <igx-dialog #returnDialog [closeOnOutsideSelect]="true">
        <div igxDialogTitle>Return Equipment</div>
        <div igxDialogContent>
          @if (selectedRequest) {
            <div class="dialog-content">
              <h4>{{ selectedRequest.equipment?.name }}</h4>
              <p><strong>Request ID:</strong> {{ selectedRequest.id }}</p>
              
              <igx-input-group>
                <label igxLabel>Equipment Condition</label>
                <select igxInput [(ngModel)]="returnCondition">
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </igx-input-group>
              
              <igx-input-group>
                <label igxLabel>Equipment Status</label>
                <select igxInput [(ngModel)]="returnStatus">
                  <option value="Available">Available</option>
                  <option value="UnderRepair">Under Repair</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </igx-input-group>
              
              <igx-input-group>
                <textarea igxInput [(ngModel)]="returnNotes" rows="3" placeholder="Any notes about the equipment condition..."></textarea>
                <label igxLabel>Return Notes (Optional)</label>
              </igx-input-group>
            </div>
          }
        </div>
        <div igxDialogActions>
          <button igxButton="flat" (click)="returnDialog.close()">Cancel</button>
          <button 
            igxButton="contained" 
            igxRipple 
            (click)="submitReturn()"
            [disabled]="!returnCondition || !returnStatus">
            Submit Return
          </button>
        </div>
      </igx-dialog>

      <igx-snackbar #snackbar></igx-snackbar>
    </div>
  `,
  styles: [`
    .my-requests-container {
      padding: 24px;
      height: 100%;
    }

    .header-section {
      margin-bottom: 24px;
    }

    .header-section h2 {
      margin: 0 0 8px 0;
      color: var(--igx-primary-600);
    }

    .equipment-info {
      line-height: 1.4;
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: 16px;
      font-weight: 600;
      font-size: 0.75rem;
      text-transform: uppercase;
    }

    .status-pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-approved {
      background-color: #d4edda;
      color: #155724;
    }

    .status-rejected {
      background-color: #f8d7da;
      color: #721c24;
    }

    .status-returned {
      background-color: #d1ecf1;
      color: #0c5460;
    }

    .pending-info {
      color: #856404;
      font-style: italic;
      font-size: 0.875rem;
    }

    .dialog-content {
      min-width: 400px;
      gap: 16px;
      display: flex;
      flex-direction: column;
    }
  `]
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