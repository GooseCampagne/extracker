import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // Asegúrate de importar correctamente
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        // Obtén el token JWT
        const idToken = await user.getIdToken();
        // Guarda el token en el almacenamiento local
        localStorage.setItem('jwt', idToken);
        // Muestra el token en la consola
        console.log('JWT:', idToken);
        return user;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Lanza el error para que pueda ser manejado en la UI
    }
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('jwt');
    });
  }
}

