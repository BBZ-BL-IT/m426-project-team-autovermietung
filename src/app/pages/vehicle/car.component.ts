import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../../data/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {


  public objForm = new UntypedFormGroup({
    vonDatum: new UntypedFormControl(Date),
    bisDatum: new UntypedFormControl(Date),
  });

  constructor(private vehicleService: VehicleService, private router: Router, private dialog: MatDialog) {
    this.reloadData();
  }

  displayedColumns: string[] = ['brand', 'model', 'enginePower', 'mileage', 'color', 'rentalPrice', 'actions'];
  name : string = "";

  data : Vehicle[] = []

  async edit(e: Vehicle){
    await this.router.navigate(['car', e.id]);
  }

  async add(){
    await this.router.navigate(['car']);
  }
  delete(e: Vehicle) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });
  }

  reloadData(){
    this.vehicleService.getList().subscribe(cars => {
      this.data = cars;
    });

    
  }

  refresh(formData: any){
    const vonDatum = formData.vonDatum;
    const bisDatum = formData.bisDatum;

    const formattedVonDatum = new Date(vonDatum).toISOString().split('T')[0];
    const formattedBisDatum = new Date(bisDatum).toISOString().split('T')[0];

    this.vehicleService.getByDate(formattedVonDatum, formattedBisDatum).subscribe(cars =>{
      this.data = cars;
    });
  }





}
