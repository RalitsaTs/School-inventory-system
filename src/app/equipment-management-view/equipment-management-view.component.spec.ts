import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxRippleDirective, IgxIconComponent, IGX_NAVIGATION_DRAWER_DIRECTIVES } from '@infragistics/igniteui-angular';
import { EquipmentManagementViewComponent } from './equipment-management-view.component';

describe('EquipmentManagementViewComponent', () => {
  let component: EquipmentManagementViewComponent;
  let fixture: ComponentFixture<EquipmentManagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentManagementViewComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, RouterTestingModule, IGX_NAVBAR_DIRECTIVES, IgxIconButtonDirective, IgxRippleDirective, IgxIconComponent, IGX_NAVIGATION_DRAWER_DIRECTIVES]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
