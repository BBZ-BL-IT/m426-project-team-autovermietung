import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  backendUrl = environment.apiUrl + '/api/login';

  private userBehaviorSubject: BehaviorSubject<User | null>;
  public user;

  constructor(private http: HttpClient, private router: Router) {
    // Load user from localStorage if it exists
    const savedUser = localStorage.getItem('user') as string;
    try {
      let localUser: User = new User();
      Object.assign(localUser, JSON.parse(savedUser) as Object)
      this.userBehaviorSubject = new BehaviorSubject<User | null>(localUser);
    } catch (error) {
      this.userBehaviorSubject = new BehaviorSubject<User | null>(null);
      console.log('Error when parsing:', error)
    }
    this.user = this.userBehaviorSubject.asObservable();
  }

  async login(username: string, password: string) {
    this.http.post(this.backendUrl, { username, password }).subscribe((res: any) => {
      if (res.message == 'Login successful') {
        this.userBehaviorSubject.next(res.user);
        localStorage.setItem('user', JSON.stringify(res.user));
        console.log('User saved:', JSON.stringify(res.user))
        this.router.navigate(['/']);
      }
    });
  }

  async logout() {
    this.userBehaviorSubject.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}

