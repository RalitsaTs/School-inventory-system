import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IGX_SELECT_DIRECTIVES, IgxIconComponent } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserWithRoles } from '../models/api/user.model';
import { AssignRoleRequest } from '../models/api/auth.models';
import { EquipmentRequestService } from '../services/equipment-request.service';
import { ReportsService, HistoryItem } from '../services/reports.service';
import { EquipmentRequest } from '../models/api/equipment-request.model';

@Component({
  selector: 'app-my-profile-view-and-history',
  imports: [CommonModule, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IGX_SELECT_DIRECTIVES, IgxIconComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile-view-and-history.component.html',
  styleUrls: ['./my-profile-view-and-history.component.scss']
})
export class MyProfileViewAndHistoryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public value?: string;
  public myRequests: EquipmentRequest[] = [];
  public activityHistory: HistoryItem[] = [];
  public isAdmin = false;
  public allUsers: UserWithRoles[] = [];
  public roleAssignmentForm: FormGroup;
  public availableRoles = ['Admin', 'User'];
  public assignmentMessage = '';
  public isAssigning = false;
  public isLoadingRequests = false;
  public isLoadingHistory = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private equipmentRequestService: EquipmentRequestService,
    private reportsService: ReportsService
  ) {
    this.roleAssignmentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }


  ngOnInit() {
    // Check if user is admin
    this.isAdmin = this.authService.isAdmin();
    
    // Load my requests
    this.loadMyRequests();
    
    // Load activity history
    this.loadActivityHistory();
    
    // Load current user email
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(
      user => {
        if (user && user.email) {
          this.value = user.email;
        }
      }
    );
    
    // Load all users if admin
    if (this.isAdmin) {
      this.loadAllUsers();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllUsers(): void {
    this.authService.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe({
      next: (users) => {
        this.allUsers = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.assignmentMessage = 'Error loading users. Please try again.';
      }
    });
  }

  private loadMyRequests(): void {
    this.isLoadingRequests = true;
    this.equipmentRequestService.getMyRequests()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (requests) => {
          this.myRequests = requests.sort((a, b) => 
            new Date(b.requestedAt || 0).getTime() - new Date(a.requestedAt || 0).getTime()
          );
          this.isLoadingRequests = false;
        },
        error: (error) => {
          console.error('Error loading my requests:', error);
          this.isLoadingRequests = false;
        }
      });
  }

  private loadActivityHistory(): void {
    this.isLoadingHistory = true;
    this.reportsService.getActivityHistory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.activityHistory = data.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          this.isLoadingHistory = false;
        },
        error: (error) => {
          console.error('Error loading activity history:', error);
          this.isLoadingHistory = false;
        }
      });
  }

  public assignRole(): void {
    if (this.roleAssignmentForm.valid && !this.isAssigning) {
      this.isAssigning = true;
      this.assignmentMessage = '';
      
      const request: AssignRoleRequest = {
        email: this.roleAssignmentForm.value.email,
        role: this.roleAssignmentForm.value.role
      };

      this.authService.assignRole(request).pipe(takeUntil(this.destroy$)).subscribe({
        next: (updatedUser) => {
          this.assignmentMessage = `Successfully assigned ${request.role} role to ${request.email}`;
          this.roleAssignmentForm.reset();
          this.loadAllUsers(); // Refresh the users list
          this.isAssigning = false;
        },
        error: (error) => {
          console.error('Error assigning role:', error);
          this.assignmentMessage = 'Error assigning role. Please check the email and try again.';
          this.isAssigning = false;
        }
      });
    }
  }

  public getUserRoles(user: UserWithRoles): string {
    return user.roles ? user.roles.join(', ') : 'No roles assigned';
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

  public truncateText(text: string | null | undefined, length: number): string {
    if (!text) return '-';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }
}
