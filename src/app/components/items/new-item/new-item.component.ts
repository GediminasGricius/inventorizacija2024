import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Employee } from '../../../models/employee';
import { EmployeesService } from '../../../services/employees.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css'
})
export class NewItemComponent {
  public itemForm:FormGroup;

  public employees:Employee[]=[];


  public lastNumber:number=0;

  constructor(private itemsService:ItemsService, private employeesService:EmployeesService){
    
    this.resetForm();

    this.itemForm=new FormGroup({
      'inv_number': new FormControl(this.lastNumber,
        {
          validators:[
            Validators.required //, this.validateInvNumber
          ],
          asyncValidators:[
            ItemsService.createUniqueInvNumberValidator(itemsService)
          ]
        }
      ),
      'name':new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'type':new FormControl(null),
      'responsible_employee_id':new FormControl(null, Validators.required),
      //Masyvas iš HTML input elemtų
      'locations':new FormArray([
        new FormControl(null, Validators.required)
      ]),
    });

    this.employeesService.loadEmployees().subscribe((data)=>{
      this.employees=data;
    })
  }

  private resetForm(){
    this.itemsService.getLastInvNumber().subscribe((n)=>{
      this.lastNumber=n;
      (this.itemForm.get('inv_number') as FormControl).setValue(n);
    });
  }

  onSubmit(){
    console.log(this.itemForm.value);
    this.itemsService.addItem(this.itemForm.value).subscribe(()=>{
      this.itemForm.reset();
      (this.itemForm.get('locations') as FormArray).controls=[
        new FormControl(null, Validators.required)
      ];
      this.resetForm();
    })
    
  }

  validateInvNumber(control:FormControl):ValidationErrors | null{
    let value=control.value;
    let pattern=/^[A-Z]{3}[0-9]{5}$/;
   
    if (pattern.test(value)){
      return null;
    }
      
    return {error:"Klaida"};
  }

  
   


  static createUniqueInvNumberValidator(itemsService:ItemsService){
    return (control:FormControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=>{
   
      return  itemsService.loadItems().pipe(map((data)=> null));
    };

  }

  

  //Paimti laukelių location masyve esančius inputus kaip masyvą
  get locations(){
    return (this.itemForm.get('locations') as FormArray).controls;
  }

 //Pridėti naujam laukeliui
  public addLocationField(){
     // Sukuriams naujas laukelis
      const field=new FormControl(null, Validators.required);
      //Laukelis įkeliamas į laukų masyvą
      (this.itemForm.get('locations') as FormArray).push(field);
      
  }

  public removeLocationField(){
    (this.itemForm.get('locations') as FormArray).removeAt(-1);
  }



}





/*
public inv_number:number|null=null;
public name:string|null=null;
public type:string|null=null;
public responsible_employee_id:string|null=null;
public locations:string[]=[];
*/