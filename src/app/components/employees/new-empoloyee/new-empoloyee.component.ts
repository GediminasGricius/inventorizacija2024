import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BirthYearValidatorDirective } from '../../../directives/birth-year-validator.directive';

@Component({
  selector: 'app-new-empoloyee',
  standalone: true,
  imports: [FormsModule, CommonModule, BirthYearValidatorDirective],
  templateUrl: './new-empoloyee.component.html',
  styleUrl: './new-empoloyee.component.css'
})
export class NewEmpoloyeeComponent {


  public newEmployeeSubmit(f:NgForm){
    console.log(f.form);
  }

}
