import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EquipmentRequest, CreateEquipmentRequest, ReturnRequest, RejectRequest } from '../models/api/equipment-request.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentRequestService {
  private readonly baseUrl = `${environment.apiUrl}/api/EquipmentRequests`;

  constructor(private http: HttpClient) {}

  createRequest(request: CreateEquipmentRequest): Observable<EquipmentRequest> {
    return this.http.post<EquipmentRequest>(`${environment.apiUrl}/request`, request);
  }

  getAllRequests(): Observable<EquipmentRequest[]> {
    return this.http.get<EquipmentRequest[]>(this.baseUrl);
  }

  getMyRequests(): Observable<EquipmentRequest[]> {
    return this.http.get<EquipmentRequest[]>(`${environment.apiUrl}/requests/mine`);
  }

  getUserRequests(userId: string): Observable<EquipmentRequest[]> {
    return this.http.get<EquipmentRequest[]>(`${this.baseUrl}/user/${userId}`);
  }

  approveRequest(id: number): Observable<EquipmentRequest> {
    return this.http.patch<EquipmentRequest>(`${this.baseUrl}/${id}/approve`, {});
  }

  rejectRequest(id: number, rejectData?: RejectRequest): Observable<EquipmentRequest> {
    return this.http.patch<EquipmentRequest>(`${this.baseUrl}/${id}/reject`, rejectData || {});
  }

  returnEquipment(id: number, returnData?: ReturnRequest): Observable<EquipmentRequest> {
    return this.http.patch<EquipmentRequest>(`${this.baseUrl}/${id}/return`, returnData || {});
  }
}