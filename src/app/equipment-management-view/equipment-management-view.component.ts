import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IGX_NAVBAR_DIRECTIVES, IGX_NAVIGATION_DRAWER_DIRECTIVES, IgxIconButtonDirective, IgxIconComponent, IgxRippleDirective, IgxToggleActionDirective } from 'igniteui-angular';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-equipment-management-view',
  imports: [IGX_NAVIGATION_DRAWER_DIRECTIVES, IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxToggleActionDirective, IgxRippleDirective, IgxIconComponent, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './equipment-management-view.component.html',
  styleUrls: ['./equipment-management-view.component.scss']
})
export class EquipmentManagementViewComponent implements OnInit {
  public currentUser: any = null;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
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
