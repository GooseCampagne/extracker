import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getUser();
    const token = localStorage.getItem('jwt');
    
    if (user && token) {
      // Verifica el token si es necesario
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
