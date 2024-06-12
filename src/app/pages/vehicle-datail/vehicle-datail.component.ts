import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../data/vehicle';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service'; // Import the VehicleService class
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vehicle-datail',
  templateUrl: './vehicle-datail.component.html',
  styleUrl: './vehicle-datail.component.css'
})
export class VehicleDatailComponent implements OnInit {


  vehicle = new Vehicle();
  public objForm = new UntypedFormGroup({
    brand: new UntypedFormControl(''),
    model: new UntypedFormControl(''),
    color: new UntypedFormControl(''),
    licensePlate: new UntypedFormControl(''),
    mileage: new UntypedFormControl(''),
    enginePower: new UntypedFormControl(''),
    fuelType: new UntypedFormControl(''),
    numberOfSeats: new UntypedFormControl(''),
    rentalPrice: new UntypedFormControl(''),
    consumption: new UntypedFormControl(''),
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private vehicleService: VehicleService) {

  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.vehicleService.getOne(id).subscribe(obj => {
        this.vehicle = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.vehicle);
    }
  }

  async back() {
    await this.router.navigate(['vehicle']);
  }

  async save(formData: any) {
    this.vehicle = Object.assign(formData);

    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe({
        next: () => {
          this.snackBar.open("Item saved!", "Close", { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open("Item could not be saved, server error!", "Close", { duration: 5000, politeness: 'assertive' });
        }
      });
    } else {
      this.vehicleService.save(this.vehicle).subscribe({
        next: () => {
          this.snackBar.open("Item saved!", "Close", { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open("Item could not be saved, server error!", "Close", { duration: 5000, politeness: 'assertive' });
        }
      });
    }
  }
}
