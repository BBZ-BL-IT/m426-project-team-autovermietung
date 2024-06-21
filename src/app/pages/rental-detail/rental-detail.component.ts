import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rental } from '../../data/rental';
import { User } from '../../data/user';
import { Vehicle } from '../../data/vehicle';
import { RentalService } from '../../services/rental.service';
import { UserService } from '../../services/user.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.css']
})
export class RentalDetailComponent implements OnInit {
  users: User[] = [];
  cars: Vehicle[] = [];

  data: Vehicle[] = [];

  rental: Rental = new Rental();
  objForm: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: UntypedFormBuilder,
    private rentalService: RentalService,
    private userService: UserService,
    private vehicleService: VehicleService
  ) {
    this.objForm = this.formBuilder.group({
      car: ['', Validators.required],
      user: ['', Validators.required],
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

          obj.car = obj.car ?? new Vehicle();
          obj.user = obj.user ?? new User();
          this.rental = obj;
          this.objForm.setValue({
            car: obj.car?.id,
            user: obj.user?.id,
            rentalStart: obj.rentalStart,
            rentalEnd: obj.rentalEnd,
            totalCost: obj.totalCost,
            status: obj.status,
          });

        },
        error: (err) => {
          console.error('Error loading rental data:', err);
          this.snackBar.open("Error loading rental data", "Close", { duration: 5000 });
        }
      });
    }

    this.userService.getList().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
    this.vehicleService.getList().subscribe({
      next: (vehicles) => {
        this.cars = vehicles;
      }
    });
  }

  async back() {
    await this.router.navigate(['rentals']);
  }

  async save(formData: any) {
    console.log(formData);
    var rental = Object.assign(formData);
    rental.id = this.rental.id ?? 0;
    rental.car = this.cars.find((car) => car.id === formData.car) ?? new Vehicle();
    rental.user = this.users.find((user) => user.id === formData.user) ?? new User();

    console.log(this.rental)

    if (this.rental.id !== 0) {
      this.rentalService.update(rental).subscribe({
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

  refresh(formData: any){
    const rentalStart = formData.rentalStart;
    const rentalEnd = formData.rentalEnd;

    const formattedRentalStart = new Date(rentalStart).toISOString().split('T')[0];
    const formattedRentalEnd = new Date(rentalEnd).toISOString().split('T')[0];

    this.vehicleService.getByDate(formattedRentalStart, formattedRentalEnd).subscribe(cars =>{
      this.data = cars;
    });
  }
}
