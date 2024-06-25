import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from '../../data/rental';
import { User } from '../../data/user';
import { Vehicle } from '../../data/vehicle';
import { AuthService } from '../../services/auth.service';
import { RentalService } from '../../services/rental.service';
import { VehicleService } from '../../services/vehicle.service'; // Import the VehicleService class

@Component({
  selector: 'app-vehicle-datail',
  templateUrl: './vehicle-datail.component.html',
  styleUrl: './vehicle-datail.component.css',
})
export class VehicleDatailComponent implements OnInit {
  user?: User = new User();

  isNotNew: boolean = true;
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

  public objFormReservation = new UntypedFormGroup({
    vonDatum: new UntypedFormControl(Date),
    bisDatum: new UntypedFormControl(Date),
  });

  constructor(
    private authService: AuthService,
    private rentalService: RentalService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(
        this.route.snapshot.paramMap.get('id') as string
      );

      this.vehicleService.getOne(id).subscribe((obj) => {
        this.vehicle = obj;
        this.objForm = this.formBuilder.group(obj);
        this.isNotNew = true;
      });
    } else {
      this.objForm = this.formBuilder.group(this.vehicle);
      this.isNotNew = false;
    }
    this.authService.user.subscribe((obj) => {
      this.user = obj ?? new User();
    });
  }

  async back() {
    await this.router.navigate(['car']);
  }

  async save(formData: any) {
    this.vehicle = Object.assign(formData);

    if (this.vehicle.id !== null) {
      this.vehicleService.update(this.vehicle).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open(
            'Item could not be saved, server error!',
            'Close',
            { duration: 5000, politeness: 'assertive' }
          );
        },
      });
    } else {
      this.vehicleService.save(this.vehicle).subscribe({
        next: () => {
          this.snackBar.open('Item saved!', 'Close', { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open(
            'Item could not be saved, server error!',
            'Close',
            { duration: 5000, politeness: 'assertive' }
          );
        },
      });
    }
  }

  saveReservation(formData: any) {
    const rental: Rental = new Rental();

    rental.rentalStart = formData.vonDatum;
    rental.rentalEnd = formData.bisDatum;
    rental.carId = this.vehicle.id;
    rental.car = this.vehicle;

    let diff = Math.abs(
      rental.rentalStart.getTime() - rental.rentalEnd.getTime()
    );
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    rental.totalCost = diffDays + 1 * this.vehicle.rentalPrice;

    rental.status = 'reserved';
    rental.user = this.user ?? new User();
    rental.userId = this.user?.id ?? 0;

    let isAvailable: boolean = false;
    const formattedVonDatum = new Date(formData.vonDatum)
      .toISOString()
      .split('T')[0];
    const formattedBisDatum = new Date(formData.bisDatum)
      .toISOString()
      .split('T')[0];

    this.vehicleService
      .isCarAvalible(rental.carId, formattedVonDatum, formattedBisDatum)
      .subscribe((isAvailableReturn) => {
        isAvailable = isAvailableReturn;

        if (isAvailable) {
          this.rentalService.save(rental).subscribe({
            next: () => {
              this.snackBar.open('Item saved!', 'Close', { duration: 5000 });
              this.back();
            },
            error: () => {
              this.snackBar.open(
                'Item could not be saved, server error!',
                'Close',
                { duration: 5000, politeness: 'assertive' }
              );
            },
          });
        } else {
          this.snackBar.open('Car is not avaiable during this time', 'Warn', {
            duration: 5000,
            politeness: 'assertive',
          });
        }
      });
  }
}
