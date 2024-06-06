import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/user';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = environment.apiUrl + '/api/login';

  private userBehaviorSubject = new BehaviorSubject<User | null>(null);
  public user = this.userBehaviorSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    const userCookie = this.cookieService.get('user');
    if (userCookie) {
      const user = JSON.parse(userCookie);
      this.userBehaviorSubject.next(user);
    }
  }

  async login(username: string, password: string) {
    await this.http.post(this.backendUrl, { username, password }).subscribe((res: any) => {
      if (res.message == 'Login successful') {
        this.userBehaviorSubject.next(res.user);
        this.cookieService.set('user', JSON.stringify(res.user));
        this.router.navigate(['/']);
      }
    });
  }

  async logout() {
    this.userBehaviorSubject.next(null);
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  }
}
