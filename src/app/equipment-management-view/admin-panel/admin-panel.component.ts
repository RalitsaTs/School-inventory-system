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
  IgxDialogModule,
  IGX_SELECT_DIRECTIVES,
  IgxCheckboxModule
} from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EquipmentRequestService } from '../../services/equipment-request.service';
import { ReportsService } from '../../services/reports.service';
import { EquipmentService } from '../../services/equipment.service';
import { UserWithRoles } from '../../models/api/user.model';
import { EquipmentRequest } from '../../models/api/equipment-request.model';
import { Equipment } from '../../models/api/equipment.model';
import { Condition, EquipmentStatus } from '../../models/api/enums';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
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
    IgxDialogModule,
    IGX_SELECT_DIRECTIVES,
    IgxCheckboxModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  @ViewChild('snackbar', { static: true }) snackbar: any;

  private destroy$: Subject<void> = new Subject<void>();
  
  public users: UserWithRoles[] = [];
  public allRequests: EquipmentRequest[] = [];
  public usageStats: any = null;
  public selectedUser: UserWithRoles | null = null;
  public newUserRole = 'User';
  public equipment: Equipment[] = [];

  constructor(
    private authService: AuthService,
    private equipmentRequestService: EquipmentRequestService,
    private reportsService: ReportsService,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadAllRequests();
    this.loadUsageStats();
    this.loadEquipment();
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
          console.log('Usage stats loaded:', stats);
          this.usageStats = stats;
        },
        error: (error) => {
          console.error('Error loading usage stats:', error);
        }
      });
  }

  private loadEquipment() {
    this.equipmentService.getAllEquipment()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (equipment) => {
          this.equipment = equipment;
        },
        error: (error) => {
          console.error('Error loading equipment:', error);
          this.snackbar?.open('Error loading equipment');
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

  // Equipment Management Methods
  public addNewEquipment() {
    const newEquipment: Equipment = {
      name: '',
      type: '',
      serialNumber: '',
      condition: Condition.Good,
      status: EquipmentStatus.Available,
      location: '',
      isSensitive: false
    };

    // Add to the beginning of the array for immediate editing
    this.equipment.unshift(newEquipment);
  }

  public onRowEditEnter(event: any) {
    // Row edit enter event
    console.log('Row edit enter:', event);
  }

  public onRowEdit(event: any) {
    // Row edit event
    console.log('Row edit:', event);
  }

  public onRowEditDone(event: any) {
    const editedEquipment = event.newValue;
    const isNewRecord = !editedEquipment.equipmentId;

    if (isNewRecord) {
      // Create new equipment
      this.equipmentService.createEquipment(editedEquipment)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (createdEquipment) => {
            // Replace the temporary record with the created one
            const index = this.equipment.findIndex(eq => !eq.equipmentId && eq.name === editedEquipment.name);
            if (index !== -1) {
              this.equipment[index] = createdEquipment;
            }
            this.snackbar?.open('Equipment created successfully');
          },
          error: (error) => {
            console.error('Error creating equipment:', error);
            this.snackbar?.open('Error creating equipment');
            // Remove the failed record
            this.equipment = this.equipment.filter(eq => eq.equipmentId || eq !== editedEquipment);
          }
        });
    } else {
      // Update existing equipment
      this.equipmentService.updateEquipment(editedEquipment.equipmentId!, editedEquipment)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (updatedEquipment) => {
            const index = this.equipment.findIndex(eq => eq.equipmentId === editedEquipment.equipmentId);
            if (index !== -1) {
              this.equipment[index] = updatedEquipment;
            }
            this.snackbar?.open('Equipment updated successfully');
          },
          error: (error) => {
            console.error('Error updating equipment:', error);
            this.snackbar?.open('Error updating equipment');
            // Revert changes
            this.loadEquipment();
          }
        });
    }
  }

  public onRowEditExit(event: any) {
    // If it's a new record that was cancelled, remove it
    const cancelledRecord = event.rowData;
    if (!cancelledRecord.equipmentId) {
      this.equipment = this.equipment.filter(eq => eq !== cancelledRecord);
    }
  }

  public deleteEquipment(equipment: Equipment) {
    if (!equipment.equipmentId) {
      // Remove from array if it's a new unsaved record
      this.equipment = this.equipment.filter(eq => eq !== equipment);
      return;
    }

    if (confirm(`Are you sure you want to delete ${equipment.name}?`)) {
      this.equipmentService.deleteEquipment(equipment.equipmentId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.equipment = this.equipment.filter(eq => eq.equipmentId !== equipment.equipmentId);
            this.snackbar?.open('Equipment deleted successfully');
          },
          error: (error) => {
            console.error('Error deleting equipment:', error);
            this.snackbar?.open('Error deleting equipment');
          }
        });
    }
  }

  public getConditionClass(condition: string): string {
    switch (condition) {
      case 'Excellent': return 'condition-excellent';
      case 'Good': return 'condition-good';
      case 'Fair': return 'condition-fair';
      case 'Damaged': return 'condition-damaged';
      default: return '';
    }
  }

  public getEquipmentStatusClass(status: string): string {
    switch (status) {
      case 'Available': return 'equipment-available';
      case 'CheckedOut': return 'equipment-checked-out';
      case 'UnderRepair': return 'equipment-under-repair';
      case 'Retired': return 'equipment-retired';
      case 'Unavailable': return 'equipment-unavailable';
      default: return '';
    }
  }

  public getStatusDisplayText(status: string): string {
    switch (status) {
      case 'CheckedOut': return 'Checked Out';
      case 'UnderRepair': return 'Under Repair';
      default: return status;
    }
  }
}