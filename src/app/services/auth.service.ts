import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Estado de inicio de sesión
  private emailSubject = new BehaviorSubject<string | null>(null); // Correo electrónico
  

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable para el estado de inicio de sesión
  email$ = this.emailSubject.asObservable(); // Observable para el correo electrónico

  // Método para iniciar sesión
  login(email: string) {
    this.isLoggedInSubject.next(true);
    this.emailSubject.next(email);
  }

  // Método para cerrar sesión
  logout() {
    this.isLoggedInSubject.next(false);
    this.emailSubject.next(null);
  }
  getEmail(): Observable<string | null> {
    return this.emailSubject.asObservable(); // Devuelve el Observable
  }

}


