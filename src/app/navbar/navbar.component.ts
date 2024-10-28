import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  email: string | null = null;
  
 
  private route=inject(ActivatedRoute);
  private afAuth = inject(AngularFireAuth);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  

  ngOnInit():void{
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios en el correo electrónico
    this.authService.email$.subscribe(email => {
      this.email = email;
    });



}
login() {
  const email = 'usuario@ejemplo.com'; // Reemplaza esto con una entrada del usuario
  this.authService.login(email);
}

// Método para cerrar sesión
logout() {
  this.authService.logout();
  this.router.navigate(['']);
  
}

}