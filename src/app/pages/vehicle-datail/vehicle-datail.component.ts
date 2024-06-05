import { Component } from '@angular/core';
import { Vehicle } from '../../data/vehicle';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-datail',
  templateUrl: './vehicle-datail.component.html',
  styleUrl: './vehicle-datail.component.css'
})
export class VehicleDatailComponent {

  vehicle = new Vehicle();
  public objForm = new UntypedFormGroup({
     brand: new UntypedFormControl(''),
     model: new UntypedFormControl(''),
     color: new UntypedFormControl(''),
     license_plate: new UntypedFormControl(''),
     mileage: new UntypedFormControl(''),
     engine_power: new UntypedFormControl(''),
     fuel_type: new UntypedFormControl(''),
     number_of_seats: new UntypedFormControl(''),
     rental_price: new UntypedFormControl(''),
     consumption: new UntypedFormControl(''),
  });

  async save(formData: any) {
    /*this.fahrzeug = Object.assign(formData);

    if (this.fahrzeug.id) {
      this.fahrzeugService.update(this.fahrzeug).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.fahrzeugService.save(this.fahrzeug).subscribe({
        next: () => {
          this.snackBar.open('', '', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('', '', {duration: 5000, politeness: 'assertive'});
        }
      });
    }*/
  }
}
