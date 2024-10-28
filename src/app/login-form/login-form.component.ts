import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html'
})
export class LoginComponent implements OnInit {
  private afAuth = inject(AngularFireAuth);
  isLoggedIn: boolean = false;
  email: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    // Suscribirse a los cambios en el estado de inicio de sesión
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios en el correo electrónico
    this.authService.email$.subscribe(email => {
      this.email = email;
    });
  }
  iniciarSesionConGoogle() {
    // Usando el proveedor de Google directamente desde AngularFireAuth
    const provider = new GoogleAuthProvider();
    
    this.afAuth.signInWithPopup(provider)
    .then(result => {
      const correo = result.user?.email;
      if (correo && correo.endsWith('@elpoli.edu.co')) {
        this.validarCorreoEnBackend(correo);
      } else {
        alert('Solo se permite iniciar sesión con un correo @elpoli.edu.co de Gmail');
        this.cerrarSesion();
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión con Google:', error);
    });
  }
  registrarConGoogle(){
    //this.router.navigate(['/listarusuario'])
    const provider = new GoogleAuthProvider();
    
    this.afAuth.signInWithPopup(provider)
    .then(result => {
      const correo = result.user?.email;
      if (correo && correo.endsWith('@elpoli.edu.co')) {
        this.validarCorreoEnBackendregistro(correo);
      } else {
        alert('Solo se permite registrarse con un correo @elpoli.edu.co ');
        this.cerrarSesion();
      }
    })
    .catch(error => {
      console.error('Error al iniciar sesión con Google:', error);
    });


  }
  

  validarCorreoEnBackend(correo: string): void {
    const headers = { 'Content-Type': 'text/plain' }; // Ajuste de encabezado para enviar como texto plano
    this.http.post<boolean>(
      'https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/validarCorreo',
      correo,
      { headers }
    )
    .subscribe(
      esValido => {
        if (esValido) {
          //llamar login
          this.authService.login(correo);
          this.router.navigate(['/dashboard']);


        } else {
          alert('Correo no registrado o no autorizado');
          this.cerrarSesion();
        }
      },
      error => {
        console.error('Error en la validación del correo:', error);
      }
    );
  }

  validarCorreoEnBackendregistro(email: string): void {
    const headers = { 'Content-Type': 'text/plain' }; // Ajuste de encabezado para enviar como texto plano
    this.http.post<boolean>(
      'https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/validarCorreo',
      email,
      { headers }
    )
    .subscribe(
      esValido => {
        if (!esValido) {
          this.router.navigate(['/nuevousuario'],{queryParams:{email}})
        } else {
          alert('Correo Ya se encuentra registrado');
          this.cerrarSesion();
        }
      },
      error => {
        console.error('Error en la validación del correo:', error);
      }
    );
  }
  isAuthenticated(): boolean {
    return sessionStorage.getItem("correo")!== null;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  
  
  

  cerrarSesion(): void {
    this.afAuth.signOut();
    this.router.navigate(['']);
  }
}

