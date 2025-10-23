import { Routes } from '@angular/router';

import { DashboardViewComponent } from './dashboard-view.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { RequestEquipmentComponent } from './request-equipment/request-equipment.component';
import { BorrowingHistoryComponent } from './borrowing-history/borrowing-history.component';
import { EquipmentRequestsViewComponent } from './equipment-requests-view/equipment-requests-view.component';

export const routes: Routes = [
  { path: '', component: DashboardViewComponent, children: [
      { path: '', redirectTo: 'student-dashboard', pathMatch: 'full' },
      { path: 'student-dashboard', component: StudentDashboardComponent, data: { text: 'Student-Dashboard' } },
      { path: 'teacher-dashboard', component: TeacherDashboardComponent, data: { text: 'Teacher-Dashboard' } },
      { path: 'request-equipment', component: RequestEquipmentComponent, data: { text: 'Request-Equipment' } },
      { path: 'borrowing-history', component: BorrowingHistoryComponent, data: { text: 'Borrowing-History' } },
      { path: 'equipment-requests-view', component: EquipmentRequestsViewComponent, data: { text: 'Equipment-Requests-View' } },
    ]
  },
];
