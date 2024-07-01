import { Component } from '@angular/core';
import { parse  } from 'papaparse';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})

export class UploadComponent {
  public tableData: Employee[] = [];
  public isDisabled: boolean = true;
  public errorMessage: string = '';
  constructor(private router: Router, private employeeService: EmployeeService) {
  
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/csv' || file.name.endsWith('.csv')) {
        this.errorMessage = '';
        parse(file, {
          complete: (result: any) => {
            var results = result.data.filter((x:any) => x != '');
            this.tableData = this.transformToEmployee(results);
            if (this.tableData.length > 0) {
              this.isDisabled = false;
            }
            //console.log('Parsed: ', result);
          }
        });
      }
      else {
        this.errorMessage = 'Invalid file type. Please upload a CSV file.';
        this.isDisabled = true;
        this.tableData = [];
      }
    }
  }

  public transformToEmployee(data : any[]) : Employee[] {
   return data.map(row => {
     let employee = new Employee();
      employee.name = row[0];
      employee.Email = row[1];
      employee.phoneNumber = row[2];
      employee.City = row[3];
      employee.Address = row[4];
      employee.Gpa = row[5];
      employee.rowError = false;
      return employee;
    });
  }

  public OnViewData() {
    this.employeeService.setEmployees(this.tableData);
    this.router.navigate(["/table-data"]);
  }
}

export class Employee {
  name!: string;
  phoneNumber!: string;
  Email!: string;
  City!: string;
  Address!: string;
  Gpa!: number;
  rowError!: boolean;

}
