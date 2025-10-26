import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/api/auth.models';

@Component({
  selector: 'app-login-view',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, FormsModule, RouterLink],
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent {
  public email = '';
  public password = '';
  public isLoading = false;
  public errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const loginRequest: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Navigate based on user role
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin-view']);
        } else {
          this.router.navigate(['/equipment-management-view']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
      }
    });
  }
}
