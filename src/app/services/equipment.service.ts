import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Equipment, EquipmentSearchParams, EquipmentUpdateStatusRequest } from '../models/api/equipment.model';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private readonly baseUrl = `${environment.apiUrl}/api/Equipment`;

  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.baseUrl);
  }

  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`);
  }

  createEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.baseUrl, equipment);
  }

  updateEquipment(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.baseUrl}/${id}`, equipment);
  }

  deleteEquipment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchEquipment(params: EquipmentSearchParams): Observable<Equipment[]> {
    let httpParams = new HttpParams();
    
    if (params.qtext) httpParams = httpParams.set('qtext', params.qtext);
    if (params.name) httpParams = httpParams.set('name', params.name);
    if (params.type) httpParams = httpParams.set('type', params.type);
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.condition) httpParams = httpParams.set('condition', params.condition);

    return this.http.get<Equipment[]>(`${this.baseUrl}/search`, { params: httpParams });
  }

  updateEquipmentStatus(id: number, statusRequest: EquipmentUpdateStatusRequest): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.baseUrl}/${id}/status`, statusRequest);
  }

  exportEquipmentToCsv(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/csv`, { 
      responseType: 'blob' 
    });
  }

  exportRequestsToCsv(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/requests/csv`, { 
      responseType: 'blob' 
    });
  }
}