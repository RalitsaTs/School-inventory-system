import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GenerateAListOfEquipmentRequestsIncludingItService } from './generate-alist-of-equipment-requests-including-it.service';

describe('GenerateAListOfEquipmentRequestsIncludingItService', () => {
  let service: GenerateAListOfEquipmentRequestsIncludingItService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(GenerateAListOfEquipmentRequestsIncludingItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
