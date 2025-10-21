import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { LoginViewComponent } from './login-view/login-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login-view', pathMatch: 'full' },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'login-view', component: LoginViewComponent, data: { text: 'Login-View' } },
  { path: 'dashboard-view', loadChildren: () => import('./dashboard-view/dashboard-view.routes').then(m => m.routes), data: { text: 'Dashboard-View' } },
  { path: '**', component: PageNotFoundComponent } // must always be last
];
