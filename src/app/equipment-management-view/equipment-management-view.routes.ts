import { Routes } from '@angular/router';

import { EquipmentManagementViewComponent } from './equipment-management-view.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { RequestEquipmentComponent } from './request-equipment/request-equipment.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { BorrowingHistoryComponent } from './borrowing-history/borrowing-history.component';
import { EquipmentRequestsViewComponent } from './equipment-requests-view/equipment-requests-view.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { MyProfileViewAndHistoryComponent } from '../my-profile-view-and-history/my-profile-view-and-history.component';
import { authGuard, adminGuard, userOrAdminGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: EquipmentManagementViewComponent, 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'equipment-list', pathMatch: 'full' },
      { 
        path: 'equipment-list', 
        component: EquipmentListComponent, 
        data: { text: 'Equipment-List' } 
      },
      { 
        path: 'request-equipment', 
        component: RequestEquipmentComponent, 
        data: { text: 'Request-Equipment' } 
      },
      { 
        path: 'my-requests', 
        component: MyRequestsComponent, 
        data: { text: 'My-Requests' } 
      },
      { 
        path: 'borrowing-history', 
        component: BorrowingHistoryComponent, 
        data: { text: 'Borrowing-History' } 
      },
      { 
        path: 'equipment-requests-view', 
        component: EquipmentRequestsViewComponent, 
        canActivate: [userOrAdminGuard],
        data: { text: 'Equipment-Requests-View' } 
      },
      { 
        path: 'admin-panel', 
        component: AdminPanelComponent, 
        canActivate: [adminGuard],
        data: { text: 'Admin-Panel' } 
      },
      { 
        path: 'my-profile', 
        component: MyProfileViewAndHistoryComponent, 
        data: { text: 'My-Profile' } 
      },
    ]
  },
];
