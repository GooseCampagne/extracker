import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.email, this.password).then(() => {
      this.router.navigate(['/login']);
    }).catch((error: any) => {
      console.error(error);
    });
  }
}
