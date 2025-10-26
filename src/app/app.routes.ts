import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'equipment-management-view', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'login-view', component: LoginViewComponent, data: { text: 'Login-View' } },
  { path: 'register-view', component: RegisterViewComponent, data: { text: 'Register-View' } },
  { 
    path: 'equipment-management-view', 
    loadChildren: () => import('./equipment-management-view/equipment-management-view.routes').then(m => m.routes), 
    data: { text: 'Equipment-Management-View' } 
  },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
