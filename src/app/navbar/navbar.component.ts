import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';


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
  usuario: Usuario | null = null;
  
  
 
  private route=inject(ActivatedRoute);
  private afAuth = inject(AngularFireAuth);

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private usuarioService :UsuarioService
  ) {}
  
  

  ngOnInit():void{
    this.obtenerUsuario();
 
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios en el correo electrónico
    this.authService.email$.subscribe(email => {
      this.email = email;
    });



}
obtenerUsuario(): void {
  // Verificar si ya tenemos el usuario en localStorage
  const usuarioLocalStorage = localStorage.getItem('usuario');
  if (usuarioLocalStorage) {
    // Si existe, se lo asignamos directamente
    this.usuario = JSON.parse(usuarioLocalStorage);

    console.log('Usuario recuperado de localStorage:', this.usuario);
  } else {
    // Si no existe en localStorage, hacemos la llamada al servicio
    this.usuarioService.getUsuario().subscribe(
      (usuario) => {
        this.usuario = usuario;  // Almacenar el usuario en la variable
        console.log('Usuario obtenido:', this.usuario);
        
        // Guardar el usuario en localStorage
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}


// Método para cerrar sesión
logout() {

  this.usuarioService.clearUsuario(); // Limpia el usuario en el servicio

  this.authService.logout();
  localStorage.removeItem('usuario');
  this.router.navigate(['']);
  
}

}