import { Routes } from '@angular/router';

import { EquipmentsReadOnlyComponent } from './equipments-read-only.component';
import { RequestEquipmentComponent } from './request-equipment/request-equipment.component';

export const routes: Routes = [
  { path: '', component: EquipmentsReadOnlyComponent, children: [
      { path: '', redirectTo: 'request-equipment', pathMatch: 'full' },
      { path: 'request-equipment', component: RequestEquipmentComponent, data: { text: 'Request-Equipment' } },
    ]
  },
];
