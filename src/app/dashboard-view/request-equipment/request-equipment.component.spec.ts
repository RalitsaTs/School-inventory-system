import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { RequestEquipmentComponent } from './request-equipment.component';

describe('RequestEquipmentComponent', () => {
  let component: RequestEquipmentComponent;
  let fixture: ComponentFixture<RequestEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestEquipmentComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, IGX_SELECT_DIRECTIVES, IGX_INPUT_GROUP_DIRECTIVES, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
