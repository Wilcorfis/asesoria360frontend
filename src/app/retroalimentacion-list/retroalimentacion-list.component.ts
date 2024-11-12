import { Component, OnInit, inject } from '@angular/core';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Retroalimentacion } from '../model/retroalimentacion.interface';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'retroalimentacion-list-app',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './retroalimentacion-list.component.html',
  styleUrl: './retroalimentacion-list.component.css'
})
export default class UsuarioListComponent implements OnInit {
  private retroalimentacionService=inject(RetroalimentacionService);
  retroalimentacion:any[]=[]
  private usuarioService=inject(UsuarioService);

  usuario: Usuario| null = null;


  isLoggedIn: boolean = false;
  email: string | null = null;
  constructor(private authService: AuthService) {}
  

  ngOnInit(): void {
    this.obtenerUsuario();



    

    this.loadAll();


    


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
  
 
  loadAll(){
    const idUsuario: number = this.usuario?.id_usuario ?? 0;

    this.retroalimentacionService.getporidusuario(idUsuario)
    .subscribe(retro=>{
      
      this.retroalimentacion=retro;
      //console.log(this.retroalimentacion)
    });
  }
  deleteretro(retro: Retroalimentacion){
    this.retroalimentacionService.delete(retro.id_retroalimentacion)
    .subscribe(()=>{
      this.loadAll();

    })
  }


}
