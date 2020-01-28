import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IEmployee } from '../IEmployee.model';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: IEmployee[];
  errorMessage: string;
  ReceiveEmpId: number;
  searchText: string;
  AlertMessage: string;
  AlertMessageBoolean: boolean;
  constructor(private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {
    this.getAllEmp();

  }
  // <button class="btn btn-primary" (click)="Edit(employee.id, employee.fullName)">Edit</button>
  // Edit(id: number, name: string) {
  //   if (name === 'Narendra') {
  //     alert(id + name);
  // this.router.navigate(['male', id]);
  //   } else {
  // this.router.navigate(['female', id]);
  // }
  // }
  Edit(id: number) {
    this.router.navigate(['edit', id]);
  }
  getAllEmp() {
    this.employeeService.getEmployees().subscribe((empList) => {
      this.employees = empList,
        // tslint:disable-next-line:no-unused-expression
        (err) => console.log(err);
    });
  }
  Delete(id: number, name: string) {
    if (this.employees.length === 1) {
      // alert('Atleast one record should be there in Table');
      this.AlertMessageBoolean = true;
      this.AlertMessage = 'Atleast one record should be there in Table currently ' + name + ' is there';
      alert(this.AlertMessage);
      return false;
    } else {
      this.employeeService.deleteEmployee(id).subscribe();
      this.getAllEmp();
      this.AlertMessageBoolean = true;
      this.AlertMessage = name + ' is Deleted';
      console.log(id + 'is Deleted');
      return true;
    }


  }
  viewEmployee(id: number, name: string) {
    if (name.toLocaleLowerCase() === 'male') {

      this.router.navigate(['/view-male', id]);
    } else if (name.toLocaleLowerCase() === 'female') {
      this.router.navigate(['/view-female', id]);
    } else {
      alert('Choose valid gender');
    }

  }
}
