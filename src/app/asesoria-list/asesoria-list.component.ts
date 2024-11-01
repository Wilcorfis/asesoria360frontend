import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { Asesoria } from '../model/asesoria.interface';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-asesoria-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './asesoria-list.component.html',
  styleUrl: './asesoria-list.component.css'
})
export default class AsesoriaListComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  asesoria:any[]=[];

  
  usuario: Usuario| null = null;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private asesoriaService :AsesoriaService
  ) {}
 
  

  ngOnInit(): void {
    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });


    

    this.loadAll();


    


  }

 
  loadAll(){
    

    this.asesoriaService.list()
    .subscribe(asesorias=>{
      console.log(asesorias)
      
      
     
      this.asesoria=asesorias;
    });
  }

}
