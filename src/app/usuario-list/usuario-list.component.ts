import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';

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
  ngOnInit(): void {
    this.usuarioService.list()
    .subscribe(usuarios=>{
      this.usuarios=usuarios;
    });
  }

}
