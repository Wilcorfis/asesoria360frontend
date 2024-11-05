import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { Asesoria } from '../model/asesoria.interface';
import { AuthService } from '../services/auth.service';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';


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
  suscripcion:any | null=null

  
  usuario: Usuario| null = null;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private asesoriaService :AsesoriaService,
    private suscripcionService:SuscripcionasesoriaService
  ) {}
 
  

  ngOnInit(): void {
    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this


    

    this.loadAll();


    


  }

 
  loadAll(){   
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    this.asesoriaService.list()
    .subscribe(asesorias=>{
      this.asesoria=asesorias;
      this.suscripcionService.getbyidusuario(idUsuario).subscribe(suscri=>{
        this.suscripcion=suscri;
      }
          

      )
      //console.log(asesorias)

     
    });
  }

}
