import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { History } from '../../data/history';
import { HistoryService } from '../../services/history.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { async } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  constructor(private historyService: HistoryService, private router: Router, private dialog: MatDialog) {
    this.reloadData();
  }

  displayedColumns: string[] = ['car_id', 'user_id', 'rentalStart', 'rentalEnd', 'totalCost', 'status', 'actions'];
  name : string = "";

  data : History[] = []

  async edit(e: History){
    await this.router.navigate(['history', e.id]);
  }

  async add(){
    await this.router.navigate(['history']);
  }
  delete(e: History) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',

    });
  }

  reloadData(){
    this.historyService.getList().subscribe(rentals => {
      this.data = rentals;
    });
  }





}
