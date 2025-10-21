import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StudentBorrowedItemsListService } from './student-borrowed-items-list.service';

describe('StudentBorrowedItemsListService', () => {
  let service: StudentBorrowedItemsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(StudentBorrowedItemsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
