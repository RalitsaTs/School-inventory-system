import { Routes } from '@angular/router';

import { EquipmentManagementViewComponent } from './equipment-management-view.component';
import { EquipmentsAdminViewComponent } from './equipments-admin-view/equipments-admin-view.component';
import { EquipmentRequestsAndConditionUpdateViewComponent } from './equipment-requests-and-condition-update-view/equipment-requests-and-condition-update-view.component';
import { RequestEquipmentComponent } from './request-equipment/request-equipment.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { authGuard, adminGuard, userOrAdminGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: EquipmentManagementViewComponent, 
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'equipments-read-only', pathMatch: 'full' },
      { 
        path: 'equipments-read-only', 
        loadChildren: () => import('./equipments-read-only/equipments-read-only.routes').then(m => m.routes), 
        data: { text: 'Equipments-Read-Only' } 
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
        path: 'equipments-admin-view', 
        component: EquipmentsAdminViewComponent, 
        canActivate: [adminGuard],
        data: { text: 'Equipments-Admin-View' } 
      },
      { 
        path: 'equipment-requests-and-condition-update-view', 
        component: EquipmentRequestsAndConditionUpdateViewComponent, 
        canActivate: [userOrAdminGuard],
        data: { text: 'Equipment-Requests-And-Condition-Update-View' } 
      },
    ]
  },
];
