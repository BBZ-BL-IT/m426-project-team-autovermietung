import { Component } from '@angular/core';
import { VehicleTest } from '../../data/vehicle_test';
import { Router } from '@angular/router';
import { Vehicle } from '../../data/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {

  constructor(private vehicleService: VehicleService, private router: Router, private dialog: MatDialog) {
    this.reloadData();
  }

  displayedColumns: string[] = ['brand', 'model', 'enginePower', 'mileage', 'color', 'rentalPrice', 'actions'];
  name : string = "";

  data : Vehicle[] = []

  async edit(e: Vehicle){
    await this.router.navigate(['history', e.id]);
  }

  async add(){
    await this.router.navigate(['history']);
  }
  delete(e: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });
  }

  reloadData(){
    this.vehicleService.getList().subscribe(fahrzeug => {
      this.data = fahrzeug;
    });
  }





}
