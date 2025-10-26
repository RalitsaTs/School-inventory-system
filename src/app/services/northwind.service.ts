import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EmployeesType } from '../models/northwind/employees-type';

@Injectable({
  providedIn: 'root'
})
export class NorthwindService {
  public getEmployees(): Observable<EmployeesType[]> {
    return of([]);
  }
}
