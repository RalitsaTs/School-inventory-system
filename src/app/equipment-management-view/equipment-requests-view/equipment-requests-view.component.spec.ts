import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { EquipmentRequestsViewComponent } from './equipment-requests-view.component';

describe('EquipmentRequestsViewComponent', () => {
  let component: EquipmentRequestsViewComponent;
  let fixture: ComponentFixture<EquipmentRequestsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentRequestsViewComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentRequestsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
