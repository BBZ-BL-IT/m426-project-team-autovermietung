import { Injectable, importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../data/vehicle';

@Injectable({
    providedIn: 'root'
  })
  export class VehicleService {

    readonly backendUrl = '/api/cars';


    constructor(private http: HttpClient) {
    }

    public getList(): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(environment.apiUrl + this.backendUrl);
    }

    public getOne(id: number): Observable<Vehicle> {
      return this.http.get<Vehicle>(environment.apiUrl + this.backendUrl + `/${id}`);
    }

    public getByDate(startDate: string, endDate: string): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(environment.apiUrl + this.backendUrl + `/byDate` + `?startDate=${startDate}&endDate=${endDate}`);
    }

    public isCarAvalible(id: number, startDate: string, endDate: string): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(environment.apiUrl + this.backendUrl + `/byDate/${id}` + `?startDate=${startDate}&endDate=${endDate}`);
    }

    public update(cars: Vehicle): Observable<Vehicle> {
      return this.http.put<Vehicle>(environment.apiUrl + this.backendUrl + `/${cars.id}`, cars);
    }

    public save(cars: Vehicle): Observable<Vehicle> {
      return this.http.post<Vehicle>(environment.apiUrl + this.backendUrl, cars);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.apiUrl + this.backendUrl + `/${id}`, {observe: 'response'});
    }
  }


