import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InventoryDocument, CreateDocumentRequest, UpdateDocumentRequest } from '../models/api/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly baseUrl = `${environment.apiUrl}/api/Documents`;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<InventoryDocument[]> {
    return this.http.get<InventoryDocument[]>(this.baseUrl);
  }

  getDocumentById(id: number): Observable<InventoryDocument> {
    return this.http.get<InventoryDocument>(`${this.baseUrl}/${id}`);
  }

  createDocument(document: CreateDocumentRequest): Observable<InventoryDocument> {
    return this.http.post<InventoryDocument>(this.baseUrl, document);
  }

  updateDocument(id: number, document: UpdateDocumentRequest): Observable<InventoryDocument> {
    return this.http.put<InventoryDocument>(`${this.baseUrl}/${id}`, document);
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}