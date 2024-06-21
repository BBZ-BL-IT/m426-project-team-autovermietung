import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from '../../data/rental';
import { RentalService } from '../../services/rental.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../data/user';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../data/vehicle';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit {
  private user!: User | null;

  public objForm = new UntypedFormGroup({
    rentalStart: new UntypedFormControl(Date),
    rentalEnd: new UntypedFormControl(Date),
  });

  constructor(private rentalService: RentalService, private authService: AuthService, private router: Router, private dialog: MatDialog,    private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
      this.reloadData();
    });
  }

  displayedColumns: string[] = ['car_id', 'user_id', 'rentalStart', 'rentalEnd', 'totalCost', 'status', 'actions'];
  name: string = "";

  data: Rental[] = []

  async openCar(e: Number) {
    await this.router.navigate(['car', e]);
  }

  async edit(e: Rental) {
    await this.router.navigate(['rental', e.id]);
  }

  async add() {
    await this.router.navigate(['rental']);
  }
  delete(e: Rental) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });
  }

  reloadData() {
    if (this.user == null) return;
    if (this.user?.isAdmin) {
      this.rentalService.getList().subscribe(rentals => {
        this.data = rentals;
      });
    }
    else {
      this.rentalService.getRentalsByUserId(this.user.id).subscribe(rentals => {
        this.data = rentals;
      });
    }
  }


  refresh(formData: any){
    const rentalStart = formData.rentalStart;
    const rentalEnd = formData.rentalEnd;

    const formattedRentalStart = new Date(rentalStart).toISOString().split('T')[0];
    const formattedRentalEnd = new Date(rentalEnd).toISOString().split('T')[0];

    this.rentalService.getByDate(formattedRentalStart, formattedRentalEnd).subscribe(rentals =>{
      this.data =  rentals;
    });
  }

}
