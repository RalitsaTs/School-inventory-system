import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TeacherInventoryListService } from './teacher-inventory-list.service';

describe('TeacherInventoryListService', () => {
  let service: TeacherInventoryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TeacherInventoryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
