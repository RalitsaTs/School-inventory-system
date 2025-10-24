import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES } from 'igniteui-angular';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { DRAFTEquipments1Component } from './draft-equipments-1.component';

describe('DRAFTEquipments1Component', () => {
  let component: DRAFTEquipments1Component;
  let fixture: ComponentFixture<DRAFTEquipments1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DRAFTEquipments1Component, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES, IgxCategoryChartModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DRAFTEquipments1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
