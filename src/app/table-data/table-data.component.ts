import { Component, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Employee } from '../upload/upload.component';
import { EmployeeService } from '../employee-service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'table-data',
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css'
})
export class TableDataComponent {
  @ViewChild(TooltipDirective) public tooltipDir!: TooltipDirective;
  public tableDetails: Employee[] = [];
  public isEmailIdValid: boolean = false;;
  public isPhoneNumber: boolean = false;
  public isEmptyString: boolean = false;
  public isGPNValid: boolean = false;
  public totalDataCount: number = 0;
  constructor(private router: Router, private employeeService: EmployeeService) {

  }
  ngOnInit(): void {
    this.employeeService.currentEmployees.subscribe((employees: Employee[]) => {
      this.tableDetails = employees;
      this.totalDataCount = this.tableDetails.length;
    });
  }

  isValidEmail(dataItem: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailIdValid = true;
    if (emailRegex.test(dataItem.Email)) {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
  }

  getToolTipEmail(dataItem: any): string {
    if (dataItem.Email == null || dataItem.Email == 'undefined' || dataItem.Email == "") {
      return 'email should not be empty';
    }
    else if (!this.isValidEmail(dataItem)) {
      return 'data type is not correct';
    }
    return '';
  }

  getToolTipPhoneNumber(dataItem: any): string {
    if (dataItem.phoneNumber == null || dataItem.phoneNumber == 'undefined' || dataItem.phoneNumber == "") {
      return 'phone number should not be empty';
    }
    else if (!this.isValidPhoneNumber(dataItem)) {
      return 'data type is not correct';
    }
    return '';
  }

  getToolTipForGPA(dataItem: any): string {
    if (dataItem.Gpa == null || dataItem.Gpa == 'undefined' || dataItem.Gpa == "") {
      return 'GPA should not be empty';
    }
    else if (!this.isValidGPA(dataItem)) {
      return 'data type is not correct';
    }
    return '';
  }


  isValidPhoneNumber(dataItem: any): boolean {
    const phoneRegex = /^\(?([0-9]{3})\)?([0-9]{3})([0-9]{4})$/;
    if (phoneRegex.test(dataItem.phoneNumber)) {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
  }

  isValidGPA(dataItem: any): boolean {
    if (dataItem.Gpa != null && dataItem.Gpa != 'undefined' && dataItem.Gpa <= 10) {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
   
  }

  isValidName(dataItem: any): boolean{
    if (dataItem.name != null && dataItem.name != 'undefined' && dataItem.name != "") {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
  }

  isValidAddress(dataItem: any): boolean {
    if (dataItem.Address != null && dataItem.Address != 'undefined' && dataItem.Address != "") {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
  }

  isValidCity(dataItem: any): boolean {
    if (dataItem.City != null && dataItem.City != 'undefined' && dataItem.City != "") {
      return true;
    }
    else {
      dataItem.rowError = true;
      return false;
    }
  }

  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (element.nodeName === "SPAN" || element.className === "k-column-title") {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }

  public OnViewSummary() {
    var errorcount = this.tableDetails.filter(x => x.rowError == true).length;
    var totalCount = this.totalDataCount - errorcount;
    this.router.navigate(['view-summary'],
      { queryParams: { p1: totalCount, p2: errorcount, p3: this.totalDataCount} });
  }
}
