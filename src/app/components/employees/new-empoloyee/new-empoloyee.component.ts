import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BirthYearValidatorDirective } from '../../../directives/birth-year-validator.directive';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-new-empoloyee',
  standalone: true,
  imports: [FormsModule, CommonModule, BirthYearValidatorDirective],
  templateUrl: './new-empoloyee.component.html',
  styleUrl: './new-empoloyee.component.css'
})
export class NewEmpoloyeeComponent {

  constructor(private employeesService:EmployeesService){
   

  }


  public newEmployeeSubmit(f:NgForm){
    
    this.employeesService.addEmployee(f.form.value).subscribe(()=>{

    });
  }

}
