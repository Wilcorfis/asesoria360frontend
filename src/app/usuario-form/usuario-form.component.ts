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
export default class UsuarioFormComponent implements OnInit {
  email: string = '';
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private usuarioService=inject(UsuarioService)
  private router=inject(Router);

  form?:FormGroup
  usuario?:Usuario
  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.usuarioService.get(parseInt(id))
      .subscribe(usuario=>{
        this.usuario=usuario
        var fechaformato = new Date(usuario.fecha_nacimiento)
        var fecha=new Date(`${fechaformato.getFullYear()}-${fechaformato.getMonth()+1}-${fechaformato.getDate()}`).toISOString().split('T')[0];
        this.form=this.fb.group({
          primer_nombre :[usuario.primer_nombre,[Validators.required]],
          segundo_nmbre :[usuario.segundo_nmbre,[Validators.required]],
          primer_apellido :[usuario.primer_apellido,[Validators.required]],
          segundo_apellido :[usuario.segundo_apellido,[Validators.required]],
          rol :[usuario.rol,[Validators.required]],
          codigotutor :[usuario.codigotutor,[Validators.required]],
          correo :[usuario.correo,[Validators.required]],
          sexo :[usuario.sexo,[Validators.required]],
          telefono :[usuario.telefono,[Validators.required]],
          fecha_nacimiento :[fecha,[Validators.required]],
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
        this.router.navigate(['/listarusuario'])
  
      })
      
    } else {
      this.usuarioService.create(usuarioForm).subscribe(()=>{
        this.router.navigate(['/login'])
  
      })
      
    }

 

  }
  

}
