import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Rental } from '../../data/rental';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { RentalService } from '../../services/rental.service';
import { Vehicle } from '../../data/vehicle';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrl: './rental-detail.component.css'
})
export class RentalDetailComponent implements OnInit {


  rental = new Rental();
  public objForm = new FormGroup({
    Vehicle: new FormGroup({
      licensePlate: new FormControl(''),
    }),
    User: new FormGroup({
      username: new FormControl(''),
    }),
    rentalStart: new FormControl(''),
    rentalEnd: new FormControl(''),
    totalCost: new FormControl(''),
    status: new FormControl(''),

  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private rentalService: RentalService) {

  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.rentalService.getOne(id).subscribe(obj => {
        this.rental = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.rental);
    }
  }
  async back() {
    await this.router.navigate(['rentals']);
  }

  async save(formData: any) {
    this.rental = Object.assign(formData);

    if (this.rental.id) {
      this.rentalService.update(this.rental).subscribe({
        next: () => {
          this.snackBar.open("Item saved!", "Close", { duration: 5000 });
          this.back();
        },
        error: () => {
          this.snackBar.open("Item could not be saved, server error!", "Close", { duration: 5000, politeness: 'assertive' });
        }
      });
    } else {
      this.rentalService.save(this.rental).subscribe({
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
