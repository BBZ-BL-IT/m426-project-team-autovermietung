import { Component } from '@angular/core';
import { VehicleTest } from '../../data/vehicle_test';
import { Router } from '@angular/router';
import { Vehicle } from '../../data/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

  constructor(private vehicleService: VehicleService, private router: Router){
    this.reloadData();
  }

  displayedColumns: string[] = ['brand', 'model', 'engine_power', 'mileage', 'color', 'rental_price', 'actions'];
  name : string = "";
  
  data : Vehicle[] = []

  async edit(e: Vehicle){
    await this.router.navigate(['edit-vehicle', e.id]);
  }

  reloadData(){
    this.vehicleService.getList().subscribe(fahrzeug => {
      this.data = fahrzeug;
    });
  }


}
