import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UsageReport {
  totalEquipment: number;
  availableCount: number;
  checkedOutCount: number;
  underRepairCount: number;
  unavailableCount: number;
  retiredCount: number;
}

export interface HistoryItem {
  id: number;
  action: string;
  equipmentName: string;
  userName: string;
  timestamp: Date;
  details?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly baseUrl = `${environment.apiUrl}/api/Reports`;

  constructor(private http: HttpClient) {}

  getUsageReport(): Observable<UsageReport> {
    return this.http.get<UsageReport>(`${this.baseUrl}/usage`);
  }

  getActivityHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.baseUrl}/history`);
  }

  exportAllData(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export`, { 
      responseType: 'blob' 
    });
  }
}