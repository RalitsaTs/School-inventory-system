import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EquipmentRequestsType } from '../models/generate-alist-of-equipment-requests-including-it/equipment-requests-type';

@Injectable({
  providedIn: 'root'
})
export class GenerateAListOfEquipmentRequestsIncludingItService {
  public getEquipmentRequests(): Observable<EquipmentRequestsType[]> {
    return of([]);
  }
}
