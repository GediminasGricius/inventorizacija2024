import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Empoloyee } from '../../../models/employee';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.css'
})
export class NewItemComponent {
  public itemForm:FormGroup;



  constructor(private itemsService:ItemsService){
    this.itemForm=new FormGroup({
      'inv_number':new FormControl(null, [Validators.required,Validators.minLength(3), this.validateInvNumber]),
      'name':new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'type':new FormControl(null),
      'responsible_employee_id':new FormControl(null, Validators.required),
      //Masyvas iš HTML input elemtų
      'locations':new FormArray([
        new FormControl(null, Validators.required)
      ]),
    });
  }

  onSubmit(){
    console.log(this.itemForm.value);
    this.itemsService.addItem(this.itemForm.value).subscribe(()=>{
      this.itemForm.reset();
      (this.itemForm.get('locations') as FormArray).controls=[
        new FormControl(null, Validators.required)
      ];
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