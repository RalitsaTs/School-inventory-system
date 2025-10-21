import { Routes } from '@angular/router';

import { DashboardViewComponent } from './dashboard-view.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardViewComponent, children: [
      { path: '', redirectTo: 'student-dashboard', pathMatch: 'full' },
      { path: 'student-dashboard', component: StudentDashboardComponent, data: { text: 'Student-Dashboard' } },
      { path: 'teacher-dashboard', component: TeacherDashboardComponent, data: { text: 'Teacher-Dashboard' } },
    ]
  },
];
