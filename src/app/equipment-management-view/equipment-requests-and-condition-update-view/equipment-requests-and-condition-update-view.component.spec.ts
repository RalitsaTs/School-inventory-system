import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { EquipmentRequestsAndConditionUpdateViewComponent } from './equipment-requests-and-condition-update-view.component';

describe('EquipmentRequestsAndConditionUpdateViewComponent', () => {
  let component: EquipmentRequestsAndConditionUpdateViewComponent;
  let fixture: ComponentFixture<EquipmentRequestsAndConditionUpdateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentRequestsAndConditionUpdateViewComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentRequestsAndConditionUpdateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
