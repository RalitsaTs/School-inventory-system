import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from '@infragistics/igniteui-angular';

@Component({
  selector: 'app-register-view',
  imports: [IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective, FormsModule],
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.scss']
})
export class RegisterViewComponent {
  public value?: string;
  public value1?: string;
}
