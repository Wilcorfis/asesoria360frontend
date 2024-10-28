import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export default class UsuarioListComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  usuarios:Usuario[]=[];

  isLoggedIn: boolean = false;
  email: string | null = null;
  constructor(private authService: AuthService) {}
  

  ngOnInit(): void {
    this.loadAll();

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios en el correo electrónico
    this.authService.email$.subscribe(email => {
      this.email = email;
    });
    


  }
  loadAll(){
    var correo=JSON.parse(this.email as string);

    this.usuarioService.list(correo)
    .subscribe(usuarios=>{
      this.usuarios=usuarios;
    });
  }
  deleteUsuario(usuario: Usuario){
    this.usuarioService.delete(usuario.id_usuario)
    .subscribe(()=>{
      this.loadAll();

    })
  }
}
