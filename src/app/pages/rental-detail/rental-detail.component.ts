import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Rental } from '../../data/rental';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { Vehicle } from '../../data/vehicle';
import { User } from '../../data/user';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {

  rental: Rental = new Rental();
  objForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private rentalService: RentalService
  ) {
    this.objForm = this.formBuilder.group({
      car: this.formBuilder.group({
        licensePlate: ['', Validators.required],
      }),
      user: this.formBuilder.group({
        username: ['', Validators.required],
      }),
      rentalStart: ['', Validators.required],
      rentalEnd: ['', Validators.required],
      totalCost: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.rentalService.getOne(Number(id)).subscribe({
        next: (obj) => {
          console.log('Rental data fetched:', obj);

          obj.car = obj.car || new Vehicle();
          obj.user = obj.user || new User();
          this.rental = obj;
          this.objForm.patchValue({
            car: { licensePlate: obj.car.licensePlate || '' },
            user: { username: obj.user.username || '' },
            user_id: obj.user_id,
            car_id: obj.car_id,
            rentalStart: obj.rentalStart,
            rentalEnd: obj.rentalEnd,
            totalCost: obj.totalCost,
            status: obj.status
          });
        },
        error: (err) => {
          console.error('Error loading rental data:', err);
          this.snackBar.open("Error loading rental data", "Close", { duration: 5000 });
        }
      });
    }
  }

  async back() {
    await this.router.navigate(['rentals']);
  }

  async save(formData: any) {


    this.rental = Object.assign(formData);

    console.log(this.rental)

    if (this.rental.id !== 0) {
      this.rentalService.update(this.rental).subscribe({
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
