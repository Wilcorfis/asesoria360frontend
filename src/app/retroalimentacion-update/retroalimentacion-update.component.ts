import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { Retroalimentacion } from '../model/retroalimentacion.interface';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';

@Component({
  selector: 'app-retroalimentacion-update',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './retroalimentacion-update.component.html',
  styleUrl: './retroalimentacion-update.component.css'
})
export default class RetroalimentacionUpdateComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private retroalimentacionService=inject(RetroalimentacionService)
  private usuarioService=inject(UsuarioService)
  private router=inject(Router);
  usuario: Usuario | null = null;
  
  form?:FormGroup
  retroalimentacion: any| null = null;

  ngOnInit():void{
    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    const id=this.route.snapshot.paramMap.get('id');
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    if(id){
      this.retroalimentacionService.get(parseInt(id))
      .subscribe(retro=>{
        this.retroalimentacion=retro
        var fechaformato = new Date(retro.fecha_retroalimentacion)
        var fecha=new Date(`${fechaformato.getFullYear()}-${fechaformato.getMonth()+1}-${fechaformato.getDate()}`).toISOString().split('T')[0];


        

        this.form=this.fb.group({
          estudiante :[{"id_usuario": idUsuario},[Validators.required]],
          asesoria :[{"id_asesoria":retro.asesoria.id_asesoria},[Validators.required]],
          puntaje :[retro.puntaje,[Validators.required]],
          comentarios :[retro.comentarios,[Validators.required]],
          fecha_retroalimentacion :[fecha,[Validators.required]],
  
        });

      });



    }
  
  }
  save(){
    const retroalimentacionForm=this.form!.value;
    //console.log(retroalimentacionForm)
    if (this.retroalimentacion) {
      this.retroalimentacionService.update(this.retroalimentacion.id_retroalimentacion,retroalimentacionForm).subscribe(()=>{
        this.router.navigate(['/listarretroalimentacion'])
  
      })
      
    }
  }
  

}
