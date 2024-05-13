import { Routes } from '@angular/router';
import { NewEmpoloyeeComponent } from './components/employees/new-empoloyee/new-empoloyee.component';
import { NewItemComponent } from './components/items/new-item/new-item.component';
import { ListItemsComponent } from './components/items/list-items/list-items.component';

export const routes: Routes = [
    {path:"employees/add", component:NewEmpoloyeeComponent},
    {path:"items/add",component:NewItemComponent},
    {path:"items/list", component:ListItemsComponent},
];
