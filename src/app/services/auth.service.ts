import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = environment.apiUrl + '/api/login';

  private isAdminBehaviorSubject = new BehaviorSubject<boolean | undefined>(false);
  public isAdmin = this.isAdminBehaviorSubject.asObservable();

  constructor(private http: HttpClient) { }

  async login(username: string, password: string) {
    await this.http.post(this.backendUrl, { username, password }).subscribe((res: any) => {
      if (res.message == 'Login successful') {
        this.isAdminBehaviorSubject.next(res.isAdmin);
      }
    });
  }
}
