import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from '../../data/rental';
import { RentalService } from '../../services/rental.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent {

  constructor(private rentalService: RentalService, private router: Router, private dialog: MatDialog) {
    this.reloadData();
  }

  displayedColumns: string[] = ['car_id', 'user_id', 'rentalStart', 'rentalEnd', 'totalCost', 'status', 'actions'];
  name : string = "";

  data : Rental[] = []

  async edit(e: Rental){
    await this.router.navigate(['rental', e.id]);
  }

  async add(){
    await this.router.navigate(['rental']);
  }
  delete(e: Rental) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });
  }

  reloadData(){
    this.rentalService.getList().subscribe(rentals => {
      this.data = rentals;
    });
  }





}
