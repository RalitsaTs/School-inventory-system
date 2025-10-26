import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, RegisterRequest, LoginResponse, AssignRoleRequest, UpdateUserRoleRequest } from '../models/api/auth.models';
import { AppUser, UserWithRoles } from '../models/api/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/api/Auth`;
  private currentUserSubject = new BehaviorSubject<AppUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(environment.tokenKey, response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.baseUrl}/register`, userData);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem(environment.tokenKey);
          this.currentUserSubject.next(null);
        })
      );
  }

  getCurrentUser(): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.baseUrl}/me`)
      .pipe(
        tap(user => this.currentUserSubject.next(user))
      );
  }

  getAllUsers(): Observable<UserWithRoles[]> {
    return this.http.get<UserWithRoles[]>(`${this.baseUrl}/users`);
  }

  assignRole(request: AssignRoleRequest): Observable<UserWithRoles> {
    return this.http.post<UserWithRoles>(`${this.baseUrl}/roles/assign`, request);
  }

  updateUserRole(userId: string, request: UpdateUserRoleRequest): Observable<UserWithRoles> {
    return this.http.put<UserWithRoles>(`${this.baseUrl}/users/${userId}/role`, request);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(environment.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user && (user as any).roles?.includes(role) || false;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isUser(): boolean {
    return this.hasRole('User');
  }

  private loadCurrentUser(): void {
    if (this.isAuthenticated()) {
      this.getCurrentUser().subscribe({
        error: () => {
          // Token might be expired, clear it
          localStorage.removeItem(environment.tokenKey);
          this.currentUserSubject.next(null);
        }
      });
    }
  }
}