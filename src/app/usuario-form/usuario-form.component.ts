import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../model/usuario.interface';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export default class ContactFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private usuarioService=inject(UsuarioService)
  private router=inject(Router);

  form?:FormGroup
  usuario?:Usuario
  ngOnInit():void{
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.usuarioService.get(parseInt(id))
      .subscribe(usuario=>{
        this.usuario=usuario
        this.form=this.fb.group({
          primer_nombre :[usuario.primer_nombre,[Validators.required]],
          segundo_nmbre :[usuario.segundo_nmbre,[Validators.required]],
          primer_apellido :[usuario.primer_apellido,[Validators.required]],
          segundo_apellido :[usuario.segundo_apellido,[Validators.required]],
          rol :[usuario.rol,[Validators.required]],
          codigotutor :[usuario.codigotutor,[Validators.required]],
          correo :[usuario.correo,[Validators.required]],
          clave :[usuario.clave,[Validators.required]],
          sexo :[usuario.sexo,[Validators.required]],
          telefono :[usuario.telefono,[Validators.required]],
          fecha_nacimiento :[usuario.fecha_nacimiento,[Validators.required]],
          descripcion :[usuario.descripcion,[Validators.required]]
        });


        })
    }else{
      this.form=this.fb.group({
        primer_nombre :['',[Validators.required]],
        segundo_nmbre :['',[Validators.required]],
        primer_apellido :['',[Validators.required]],
        segundo_apellido :['',[Validators.required]],
        rol :['',[Validators.required]],
        codigotutor :['',[Validators.required]],
        correo :['',[Validators.required]],
        clave :['',[Validators.required]],
        sexo :['',[Validators.required]],
        telefono :['',[Validators.required]],
        fecha_nacimiento :['',[Validators.required]],
        descripcion :['',[Validators.required]]
      });
    }
   

  }

  save(){
    const usuarioForm=this.form!.value;
    if (this.usuario) {
      this.usuarioService.update(this.usuario.id_usuario,usuarioForm).subscribe(()=>{
        this.router.navigate(['/'])
  
      })
      
    } else {
      this.usuarioService.create(usuarioForm).subscribe(()=>{
        this.router.navigate(['/'])
  
      })
      
    }

 

  }
  

}
