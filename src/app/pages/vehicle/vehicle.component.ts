import { Component } from '@angular/core';
import { VehicleTest } from '../../data/vehicle_test';
import { Router } from '@angular/router';
import { Vehicle } from '../../data/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

  constructor(private router: Router){

  }
  
   vehicle1 = new VehicleTest(
    1,
    'Toyota',
    'Camry',
    'Red',
    'ABC123',
    15000,
    250,
    'Petrol',
    5,
    100,
    50
);

 vehicle2 = new VehicleTest(
    2,
    'Honda',
    'Civic',
    'Blue',
    'XYZ789',
    30000,
    180,
    'Diesel',
    5,
    90,
    50
);

 vehicle3 = new VehicleTest(
    3,
    'Tesla',
    'Model S',
    'Black',
    'EV456',
    10000,
    300,
    'Electric',
    5,
    150,
    50
);

  displayedColumns: string[] = ['brand', 'model', 'enginePower', 'mileage', 'color', 'rentalPrice', 'actions'];
  name : string = "";

  
  data : VehicleTest[] = [this.vehicle1, this.vehicle2, this.vehicle3]

  async edit(e: Vehicle){
    await this.router.navigate(['fahrzeugdetail', e.id]);
  }

}
