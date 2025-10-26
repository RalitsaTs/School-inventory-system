import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from 'igniteui-angular';
import { EquipmentsReadOnlyComponent } from './equipments-read-only.component';

describe('EquipmentsReadOnlyComponent', () => {
  let component: EquipmentsReadOnlyComponent;
  let fixture: ComponentFixture<EquipmentsReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsReadOnlyComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
