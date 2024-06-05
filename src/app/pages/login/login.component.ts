import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginForm = new UntypedFormGroup({
    username: new UntypedFormControl('john_doe'),
    password: new UntypedFormControl('password123')
  });

  constructor(private authService: AuthService) { }

  login(formdata: any) {
    this.authService.login(formdata.username, formdata.password);
  }
}
