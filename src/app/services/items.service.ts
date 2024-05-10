import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http:HttpClient) { 

  }


  public addItem(item:Item){
    return this.http.post('https://inventorizacija-d9f77-default-rtdb.europe-west1.firebasedatabase.app/items.json',item);
  }

}
