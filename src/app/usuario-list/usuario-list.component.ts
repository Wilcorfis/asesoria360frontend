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
 

    // Suscribirse a los cambios en el correo electrónico

    
      this.emailSubscription = this.authService.getEmail().subscribe(email => {
        
        this.email = email; // Actualiza el correo cuando cambie
      });
    

    this.loadAll();


    


  }
  ngOnDestroy() {
    this.emailSubscription.unsubscribe(); // Limpia la suscripción al destruir el componente
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
