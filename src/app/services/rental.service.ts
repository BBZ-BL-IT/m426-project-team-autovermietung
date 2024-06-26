import { Injectable, importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rental } from '../data/rental';
import { User } from '../data/user';

@Injectable({
    providedIn: 'root'
  })
  export class RentalService {


    readonly backendUrl = '/api/rental';



    constructor(private http: HttpClient) {

    }


    public getList(): Observable<Rental[]> {
      return this.http.get<Rental[]>(environment.apiUrl + this.backendUrl);
    }

    public getOne(id: number): Observable<Rental> {
      return this.http.get<Rental>(environment.apiUrl + this.backendUrl + `/${id}`);
    }

    public update(rental: Rental): Observable<Rental> {
      return this.http.put<Rental>(environment.apiUrl + this.backendUrl + `/${rental.id}`, rental);
    }

    public save(rental: Rental): Observable<Rental> {
      return this.http.post<Rental>(environment.apiUrl + this.backendUrl, rental);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.apiUrl + this.backendUrl + `/${id}`, {observe: 'response'});
    }


    public getRentalsByUserId(userId: number): Observable<Rental[]> {
      return this.http.get<Rental[]>(`${environment.apiUrl}${this.backendUrl}/user/${userId}`);
    }

    public getByDate(rentalStart: string, rentalEnd: string): Observable<Rental[]> {
      return this.http.get<Rental[]>(environment.apiUrl + this.backendUrl + `/byDate` + `?rentalStart=${rentalStart}&rentalEnd=${rentalEnd}`);
    }



  }


