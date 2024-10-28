// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';

  login(): void {
    sessionStorage.setItem(this.isLoggedInKey, 'true');
  }

  logout(): void {
    sessionStorage.removeItem(this.isLoggedInKey);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
