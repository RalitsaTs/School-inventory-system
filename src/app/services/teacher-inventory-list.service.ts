import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeacherInventoryType } from '../models/teacher-inventory-list/teacher-inventory-type';
import { TeacherInventoryList } from '../static-data/teacher-inventory-list';

@Injectable({
  providedIn: 'root'
})
export class TeacherInventoryListService {
  public getTeacherInventory(): Observable<TeacherInventoryType[]> {
    return of(TeacherInventoryList['TeacherInventoryType']);
  }
}
