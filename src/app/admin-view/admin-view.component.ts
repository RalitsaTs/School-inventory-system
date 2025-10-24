import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxButtonDirective, IgxIconComponent, IgxRadioComponent, IgxRadioGroupDirective, IgxRippleDirective } from 'igniteui-angular';

@Component({
  selector: 'app-admin-view',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IGX_TABS_DIRECTIVES, IgxRadioGroupDirective, IgxIconComponent, IgxRadioComponent, IgxButtonDirective, IgxRippleDirective, FormsModule],
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {
  public value?: string;
  public value1: any = User;
}
