import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGX_GRID_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IGX_SELECT_DIRECTIVES, IgxIconComponent } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { EmployeesType } from '../models/northwind/employees-type';
import { NorthwindService } from '../services/northwind.service';
import { AuthService } from '../services/auth.service';
import { UserWithRoles } from '../models/api/user.model';
import { AssignRoleRequest } from '../models/api/auth.models';

@Component({
  selector: 'app-my-profile-view-and-history',
  imports: [CommonModule, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IGX_SELECT_DIRECTIVES, IgxIconComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './my-profile-view-and-history.component.html',
  styleUrls: ['./my-profile-view-and-history.component.scss']
})
export class MyProfileViewAndHistoryComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public value?: string;
  public northwindEmployees: EmployeesType[] = [];
  public isAdmin = false;
  public allUsers: UserWithRoles[] = [];
  public roleAssignmentForm: FormGroup;
  public availableRoles = ['Admin', 'User'];
  public assignmentMessage = '';
  public isAssigning = false;

  constructor(
    public northwindService: NorthwindService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.roleAssignmentForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }


  ngOnInit() {
    // Check if user is admin
    this.isAdmin = this.authService.isAdmin();
    
    // Load borrowing history
    this.northwindService.getEmployees().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.northwindEmployees = data
    );
    
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
}
