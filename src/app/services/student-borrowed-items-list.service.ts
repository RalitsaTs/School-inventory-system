import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BorrowedItemsType } from '../models/student-borrowed-items-list/borrowed-items-type';

@Injectable({
  providedIn: 'root'
})
export class StudentBorrowedItemsListService {
  public getBorrowedItems(): Observable<BorrowedItemsType[]> {
    return of([]);
  }
}
