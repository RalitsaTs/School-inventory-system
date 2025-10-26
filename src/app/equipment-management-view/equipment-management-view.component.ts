import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IGX_NAVBAR_DIRECTIVES, IGX_NAVIGATION_DRAWER_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IgxRippleDirective, IgxToggleActionDirective } from 'igniteui-angular';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-equipment-management-view',
  imports: [IGX_NAVIGATION_DRAWER_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxToggleActionDirective, IgxRippleDirective, IgxIconComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './equipment-management-view.component.html',
  styleUrls: ['./equipment-management-view.component.scss']
})
export class EquipmentManagementViewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public currentUser: any = null;
  public isAuthLoaded = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to current user changes and mark auth as loaded
    this.authService.currentUser$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.currentUser = user;
      this.isAuthLoaded = true;
    });

    // If user is already authenticated but currentUser is null, force reload
    if (this.authService.isAuthenticated() && !this.currentUser) {
      this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe({
        next: (user) => {
          this.currentUser = user;
          this.isAuthLoaded = true;
        },
        error: () => {
          this.isAuthLoaded = true;
        }
      });
    } else {
      this.isAuthLoaded = true;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login-view']);
      },
      error: () => {
        // Even if logout fails on server, clear local storage
        this.router.navigate(['/login-view']);
      }
    });
  }
}
