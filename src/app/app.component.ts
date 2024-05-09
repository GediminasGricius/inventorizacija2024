import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewEmpoloyeeComponent } from './components/employees/new-empoloyee/new-empoloyee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NewEmpoloyeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventorizacija';
}
