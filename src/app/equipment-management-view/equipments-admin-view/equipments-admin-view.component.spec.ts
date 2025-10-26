import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective } from '@infragistics/igniteui-angular';
import { EquipmentsAdminViewComponent } from './equipments-admin-view.component';

describe('EquipmentsAdminViewComponent', () => {
  let component: EquipmentsAdminViewComponent;
  let fixture: ComponentFixture<EquipmentsAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentsAdminViewComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, IGX_GRID_DIRECTIVES, IgxButtonDirective, IgxRippleDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentsAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
