import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EquipmentRequestsType } from '../models/generate-alist-of-equipment-requests-including-it/equipment-requests-type';
import { GenerateAListOfEquipmentRequestsIncludingIt } from '../static-data/generate-alist-of-equipment-requests-including-it';

@Injectable({
  providedIn: 'root'
})
export class GenerateAListOfEquipmentRequestsIncludingItService {
  public getEquipmentRequests(): Observable<EquipmentRequestsType[]> {
    return of(GenerateAListOfEquipmentRequestsIncludingIt['EquipmentRequestsType']);
  }
}
