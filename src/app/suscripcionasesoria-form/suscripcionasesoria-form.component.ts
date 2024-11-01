import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-suscripcionasesoria-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './suscripcionasesoria-form.component.html',
  styleUrl: './suscripcionasesoria-form.component.css'
})
export default class SuscripcionasesoriaFormComponent implements OnInit {
  usuario: Usuario| null = null;
  isLoggedIn: boolean = false;
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private suscripcionasesoriaService=inject(SuscripcionasesoriaService)
  private router=inject(Router);
  form?:FormGroup

  private usuarioService=inject(UsuarioService)
  private authService=inject(AuthService);

  ngOnInit():void{
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.form=this.fb.group({

      });
      const suscripcionasesoriaoForm=this.form!.value;
      const idUsuario: number = this.usuario?.id_usuario ?? 0;
      suscripcionasesoriaoForm["estudiante"] ={"id_usuario":idUsuario};
      suscripcionasesoriaoForm["asesoria"] = {"id_asesoria":parseInt(id)}
      this.suscripcionasesoriaService.create(suscripcionasesoriaoForm).subscribe(()=>{
        this.router.navigate(['/dashboard'])
  
      })

  
     }
  

}}
