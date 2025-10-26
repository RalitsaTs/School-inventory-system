import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { 
  IGX_INPUT_GROUP_DIRECTIVES, 
  IGX_TABS_DIRECTIVES, 
  IgxButtonDirective, 
  IgxIconComponent, 
  IgxRippleDirective,
  IgxGridModule,
  IgxSnackbarComponent,
  IgxDialogModule
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { EquipmentRequestService } from '../services/equipment-request.service';
import { ReportsService } from '../services/reports.service';
import { UserWithRoles } from '../models/api/user.model';
import { EquipmentRequest } from '../models/api/equipment-request.model';

@Component({
  selector: 'app-admin-view',
  imports: [
    CommonModule,
    FormsModule,
    IGX_INPUT_GROUP_DIRECTIVES, 
    IGX_TABS_DIRECTIVES, 
    IgxIconComponent, 
    IgxButtonDirective, 
    IgxRippleDirective,
    IgxGridModule,
    IgxSnackbarComponent,
    IgxDialogModule
  ],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit, OnDestroy {
  @ViewChild('snackbar', { static: true }) snackbar: any;

  private destroy$: Subject<void> = new Subject<void>();
  
  public users: UserWithRoles[] = [];
  public allRequests: EquipmentRequest[] = [];
  public usageStats: any = null;
  public selectedUser: UserWithRoles | null = null;
  public newUserRole = 'User';

  constructor(
    private authService: AuthService,
    private equipmentRequestService: EquipmentRequestService,
    private reportsService: ReportsService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadAllRequests();
    this.loadUsageStats();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers() {
    this.authService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.snackbar?.open('Error loading users');
        }
      });
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

  private loadUsageStats() {
    this.reportsService.getUsageReport()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.usageStats = stats;
        },
        error: (error) => {
          console.error('Error loading usage stats:', error);
        }
      });
  }

  public updateUserRole(user: UserWithRoles, newRole: string) {
    if (!user.id) return;

    this.authService.updateUserRole(user.id, { role: newRole })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedUser) => {
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          this.snackbar?.open(`User role updated to ${newRole}`);
        },
        error: (error) => {
          console.error('Error updating user role:', error);
          this.snackbar?.open('Error updating user role');
        }
      });
  }

  public onRoleChange(event: Event, user: UserWithRoles) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.updateUserRole(user, target.value);
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

  public exportData() {
    this.reportsService.exportAllData()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `inventory-export-${new Date().toISOString().split('T')[0]}.csv`;
          link.click();
          window.URL.revokeObjectURL(url);
          this.snackbar?.open('Data exported successfully');
        },
        error: (error) => {
          console.error('Error exporting data:', error);
          this.snackbar?.open('Error exporting data');
        }
      });
  }
}
