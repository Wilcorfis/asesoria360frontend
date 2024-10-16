import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export default class ContactFormComponent {
  private fb=inject(FormBuilder);
  private usuarioService=inject(UsuarioService)
  private router=inject(Router);
  form=this.fb.group({
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
  })
  create(){
    const contact=this.form.value
    this.usuarioService.create(contact).subscribe(()=>{
      this.router.navigate(['/'])

    })

  }
  

}
