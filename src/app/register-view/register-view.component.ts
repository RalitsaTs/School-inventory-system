import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/api/auth.models';

@Component({
  selector: 'app-register-view',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, FormsModule, RouterLink],
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {
  public email = '';
  public password = '';
  public confirmPassword = '';
  public isLoading = false;
  public errorMessage = '';
  public successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public onRegister() {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const registerRequest: RegisterRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Account created successfully! You can now login.';
        setTimeout(() => {
          this.router.navigate(['/login-view']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}
