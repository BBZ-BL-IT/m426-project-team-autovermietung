import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehicleDatailComponent } from './pages/vehicle-datail/vehicle-datail.component';
import { HistoryComponent } from './pages/rental/rental.component';
import { HistoryDetailComponent } from './pages/history-detail/history-detail.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent, pathMatch: "full"
  },
  {
    path: "cars", component: VehicleComponent, pathMatch: "full"
  },
  {
    path: "car", component: VehicleDatailComponent, pathMatch: "full"
  },
  {
    path: "car/:id", component: VehicleDatailComponent, pathMatch: "full"
  },
  {
    path: "historys", component: HistoryComponent, pathMatch: "full"
  },
  {
    path: "history", component: HistoryDetailComponent, pathMatch: "full"
  },
  {
    path: "history/:id", component: HistoryDetailComponent, pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
