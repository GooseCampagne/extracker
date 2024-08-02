import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;
  errorMessage: string | null = null; // Variable para el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).then(() => {
      this.router.navigate(['/activities']); // Redirige a la página de actividades
    }).catch((error: any) => {
      console.error('Login error:', error);
      this.errorMessage = 'Correo o contraseña incorrectos'; // Muestra el mensaje de error
    });
  }
}

