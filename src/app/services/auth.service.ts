import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../data/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = environment.apiUrl + '/api/login';

  private userBehaviorSubject = new BehaviorSubject<User | null | undefined>(null);
  public user = this.userBehaviorSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  async login(username: string, password: string) {
    await this.http.post(this.backendUrl, { username, password }).subscribe((res: any) => {
      if (res.message == 'Login successful') {
        this.userBehaviorSubject.next(res.user);
        this.router.navigate(['/']);
      }
    });
  }
}
