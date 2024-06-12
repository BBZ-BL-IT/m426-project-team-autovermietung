import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CarComponent } from './pages/vehicle/car.component';
import { VehicleDatailComponent } from './pages/vehicle-datail/vehicle-datail.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent, pathMatch: "full"
  },
  {
    path: "cars", component: CarComponent, pathMatch: "full"
  },
  {
    path: "car", component: VehicleDatailComponent, pathMatch: "full"
  },
  {
    path: "car/:id", component: VehicleDatailComponent, pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
