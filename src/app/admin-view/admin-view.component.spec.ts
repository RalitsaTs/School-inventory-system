import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IGX_TABS_DIRECTIVES, IgxIconComponent, IGX_INPUT_GROUP_DIRECTIVES, IgxRadioComponent, IgxRadioGroupDirective, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { AdminViewComponent } from './admin-view.component';

describe('AdminViewComponent', () => {
  let component: AdminViewComponent;
  let fixture: ComponentFixture<AdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, IGX_TABS_DIRECTIVES, IgxIconComponent, IGX_INPUT_GROUP_DIRECTIVES, IgxRadioComponent, IgxRadioGroupDirective, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
