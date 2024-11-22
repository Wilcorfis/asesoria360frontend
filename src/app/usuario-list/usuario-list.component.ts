import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export default class UsuarioListComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  usuario:Usuario={
    id_usuario: 0,
    primer_nombre: '',
    segundo_nmbre: '',
    primer_apellido: '',
    segundo_apellido: '',
    rol: '',
    codigotutor: '',
    correo: '',
    sexo: '',
    telefono: '',
    fecha_nacimiento: '',
    descripcion: ''
  }
  private emailSubscription: Subscription = new Subscription;

  isLoggedIn: boolean = false;
  email: string | null = null;
  constructor(private authService: AuthService) {}
  

  ngOnInit(): void {
    this.obtenerEmail();
 

    // Suscribirse a los cambios en el correo electrónico

    

    

    this.loadAll();

  }
  obtenerEmail(): void {
    // Verificar si ya tenemos el usuario en localStorage
    const usuarioLocalStorage = localStorage.getItem('email');
    if (usuarioLocalStorage) {
      // Si existe, se lo asignamos directamente
      this.email = JSON.parse(usuarioLocalStorage);
  
      console.log('Correo recuperado de localStorage:', this.email);
    } else {
      // Si no existe en localStorage, hacemos la llamada al servicio
      this.authService.getEmail().subscribe(
        (email) => {
          this.email = email;  // Almacenar el usuario en la variable
          console.log('email obtenido:', this.email);
          
          // Guardar el usuario en localStorage
          localStorage.setItem('email', JSON.stringify(this.email));
        },
        (error) => {
          console.error('Error al obtener el email:', error);
        }
      );
    }
  }

  extractAndFormatDate(string: string) {
    // Expresión regular para fechas en formato yyyy-mm-dd o similar
    const dateRegex = /(\d{4})[-\/](\d{2})[-\/](\d{2})/;
    const match = string.match(dateRegex);

    if (match) {
        const [_, year, month, day] = match;
        // Crear un string con el formato deseado
        return `${year}-${month}-${day}`;
    } else {
        throw new Error("No se encontró una fecha válida en el string.");
    }
}
  
 
  loadAll(){
    

    this.usuarioService.list(this.email)
    .subscribe(usuarios=>{
     
     
      this.usuario=usuarios;
    });
  }
  deleteUsuario(usuario: Usuario){
    this.usuarioService.delete(usuario.id_usuario)
    .subscribe(()=>{  
      this.loadAll();

    })
  }
}
