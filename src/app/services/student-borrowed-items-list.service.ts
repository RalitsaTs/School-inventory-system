import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BorrowedItemsType } from '../models/student-borrowed-items-list/borrowed-items-type';
import { StudentBorrowedItemsList } from '../static-data/student-borrowed-items-list';

@Injectable({
  providedIn: 'root'
})
export class StudentBorrowedItemsListService {
  public getBorrowedItems(): Observable<BorrowedItemsType[]> {
    return of(StudentBorrowedItemsList['BorrowedItemsType']);
  }
}
