import { Component } from '@angular/core';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';

@Component({
  selector: 'app-request-equipment',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxButtonDirective, IgxRippleDirective],
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.scss']
})
export class RequestEquipmentComponent {}
