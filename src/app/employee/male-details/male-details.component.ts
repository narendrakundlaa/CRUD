import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { IEmployee } from '../../IEmployee.model';

@Component({
  selector: 'app-male-details',
  templateUrl: './male-details.component.html',
  styleUrls: ['./male-details.component.css']
})
export class MaleDetailsComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    // tslint:disable-next-line:align
    private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private router: Router
) { }
employees: IEmployee;
private id: number;
ngOnInit() {
// this.employee = this._employeeService.getEmployee(this._id);
this.route.paramMap.subscribe(paramData => {
this.id = +paramData.get('id');
// tslint:disable-next-line:align
this.employeeService.getEmployee(this.id).subscribe((employee) => this.employees = employee);
});
}
Edit(id: number) {
// this.router.navigate(['create', id]);
this.router.navigate(['edit', id]);
}

}
