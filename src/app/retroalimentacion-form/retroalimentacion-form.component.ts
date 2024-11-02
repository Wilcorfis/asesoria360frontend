import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { Retroalimentacion } from '../model/retroalimentacion.interface';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';

@Component({
  selector: 'app-retroalimentacion-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './retroalimentacion-form.component.html',
  styleUrl: './retroalimentacion-form.component.css'
})
export default class RetroalimentacionFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private retroalimentacionService=inject(RetroalimentacionService)
  private usuarioService=inject(UsuarioService)
  private router=inject(Router);
  usuario: Usuario | null = null;
  idAsesoria!: number;
  form?:FormGroup
  retroalimentacion?:Retroalimentacion

  ngOnInit():void{
    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.idAsesoria = +this.route.snapshot.paramMap.get('id')!;
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    if(this.idAsesoria){

      this.form=this.fb.group({
        estudiante :[{"id_usuario": idUsuario},[Validators.required]],
        asesoria :[{"id_asesoria":this.idAsesoria},[Validators.required]],
        puntaje :['',[Validators.required]],
        comentarios :['',[Validators.required]],
        fecha_retroalimentacion :[new Date().toISOString().split('T')[0],[Validators.required]],

      });

    }
  
  }
  save(){
    const retroalimentacionForm=this.form!.value;
    console.log(retroalimentacionForm)
    if (this.retroalimentacion) {
      /*this.usuarioService.update(this.usuario.id_usuario,usuarioForm).subscribe(()=>{
        this.router.navigate([''])
  
      })*/
      
    } else {
      this.retroalimentacionService.create(retroalimentacionForm).subscribe(()=>{
        this.router.navigate(['/listarretroalimentacion'])
  
      })
      
  
      
      
    }

 

  }
  

}
