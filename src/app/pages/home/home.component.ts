import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  displayedColumns: string[] = ['brand', 'model', 'engine_power', 'mileage', 'color', 'rental_prize'];
  name : string = "";
}
