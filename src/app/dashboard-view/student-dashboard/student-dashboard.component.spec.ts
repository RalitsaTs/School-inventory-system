import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES } from 'igniteui-angular';

import { StudentDashboardComponent } from './student-dashboard.component';

describe('StudentDashboardComponent', () => {
  let component: StudentDashboardComponent;
  let fixture: ComponentFixture<StudentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboardComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, IGX_CARD_DIRECTIVES, IgxAvatarComponent, IgxIconComponent, IGX_GRID_DIRECTIVES]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
