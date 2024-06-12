import { Injectable, importProvidersFrom } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { History } from '../data/history';

@Injectable({
    providedIn: 'root'
  })
  export class HistoryService {

    readonly backendUrl = '/api/rental';


    constructor(private http: HttpClient) {
    }

    public getList(): Observable<History[]> {
      return this.http.get<History[]>(environment.apiUrl + this.backendUrl);
    }

    public getOne(id: number): Observable<History> {
      return this.http.get<History>(environment.apiUrl + this.backendUrl + `/${id}`);
    }

    public update(cars: History): Observable<History> {
      return this.http.put<History>(environment.apiUrl + this.backendUrl + `/${cars.id}`, cars);
    }

    public save(cars: History): Observable<History> {
      return this.http.post<History>(environment.apiUrl + this.backendUrl, cars);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.apiUrl + this.backendUrl + `/${id}`, {observe: 'response'});
    }
  }


