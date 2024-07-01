import { Injectable } from '@angular/core';
import { Employee } from './upload/upload.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private employees = new BehaviorSubject<Employee[]>([]);
  currentEmployees = this.employees.asObservable();
  constructor() {

  }
  setEmployees(employees: Employee[]) {
    this.employees.next(employees);
  }

  
}
