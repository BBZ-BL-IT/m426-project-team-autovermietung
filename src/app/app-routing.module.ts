import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehicleDatailComponent } from './pages/vehicle-datail/vehicle-datail.component';
import { RentalComponent } from './pages/rental/rental.component';
import { RentalDetailComponent } from './pages/rental-detail/rental-detail.component';

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
    path: "rentals", component: RentalComponent, pathMatch: "full"
  },
  {
    path: "rental", component: RentalDetailComponent, pathMatch: "full"
  },
  {
    path: "rental/:id", component: RentalDetailComponent, pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
