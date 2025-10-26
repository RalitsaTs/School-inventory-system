import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MyProfileViewAndHistoryComponent } from './my-profile-view-and-history/my-profile-view-and-history.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'equipment-management-view', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'login-view', component: LoginViewComponent, data: { text: 'Login-View' } },
  { path: 'register-view', component: RegisterViewComponent, data: { text: 'Register-View' } },
  { 
    path: 'admin-view', 
    component: AdminViewComponent, 
    canActivate: [authGuard, adminGuard],
    data: { text: 'Admin-View' } 
  },
  { 
    path: 'my-profile-view-and-history', 
    component: MyProfileViewAndHistoryComponent, 
    canActivate: [authGuard],
    data: { text: 'My-Profile-View-And-History' } 
  },
  { 
    path: 'equipment-management-view', 
    loadChildren: () => import('./equipment-management-view/equipment-management-view.routes').then(m => m.routes), 
    data: { text: 'Equipment-Management-View' } 
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
