import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly backendUrl = '/api/user';


  constructor(private http: HttpClient) {
  }

  public getList(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + this.backendUrl + `/${id}`);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(environment.apiUrl + this.backendUrl + `/${user.id}`, user);
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(environment.apiUrl + this.backendUrl, user);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.apiUrl + this.backendUrl + `/${id}`, { observe: 'response' });
  }
}


