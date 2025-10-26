import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IGX_DATE_PICKER_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxButtonDirective, IgxIconComponent, IgxRippleDirective } from 'igniteui-angular';

@Component({
  selector: 'app-request-equipment',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_DATE_PICKER_DIRECTIVES, IGX_SELECT_DIRECTIVES, IgxIconComponent, IgxButtonDirective, IgxRippleDirective, FormsModule, RouterLink],
  templateUrl: './request-equipment.component.html',
  styleUrls: ['./request-equipment.component.scss']
})
export class RequestEquipmentComponent {
  public value: string = '1';
  public value1: Date = new Date('10/27/2025 10:00:00');
  public value2: Date = new Date('10/28/2025 16:00:00');
}
