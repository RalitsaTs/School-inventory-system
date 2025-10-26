import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES } from '@infragistics/igniteui-angular';
import { MyProfileViewAndHistoryComponent } from './my-profile-view-and-history.component';

describe('MyProfileViewAndHistoryComponent', () => {
  let component: MyProfileViewAndHistoryComponent;
  let fixture: ComponentFixture<MyProfileViewAndHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileViewAndHistoryComponent, NoopAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule, IGX_INPUT_GROUP_DIRECTIVES, IGX_GRID_DIRECTIVES]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileViewAndHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
