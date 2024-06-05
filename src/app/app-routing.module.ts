import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VehicleComponent } from './pages/vehicle/vehicle.component';
import { VehicleDatailComponent } from './pages/vehicle-datail/vehicle-datail.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent, pathMatch: "full"
  },
  {
    path: "autos", component: VehicleComponent, pathMatch: "full"
  },
  {
    path: "edit-vehicle/:id", component: VehicleDatailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
