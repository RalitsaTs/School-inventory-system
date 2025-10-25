import { Routes } from '@angular/router';

import { EquipmentManagementViewComponent } from './equipment-management-view.component';
import { EquipmentsAdminViewComponent } from './equipments-admin-view/equipments-admin-view.component';
import { EquipmentRequestsAndConditionUpdateViewComponent } from './equipment-requests-and-condition-update-view/equipment-requests-and-condition-update-view.component';

export const routes: Routes = [
  { path: '', component: EquipmentManagementViewComponent, children: [
      { path: '', redirectTo: 'equipments-read-only', pathMatch: 'full' },
      { path: 'equipments-read-only', loadChildren: () => import('./equipments-read-only/equipments-read-only.routes').then(m => m.routes), data: { text: 'Equipments-Read-Only' } },
      { path: 'equipments-admin-view', component: EquipmentsAdminViewComponent, data: { text: 'Equipments-Admin-View' } },
      { path: 'equipment-requests-and-condition-update-view', component: EquipmentRequestsAndConditionUpdateViewComponent, data: { text: 'Equipment-Requests-And-Condition-Update-View' } },
    ]
  },
];
