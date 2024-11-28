import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Asesoria } from '../model/asesoria.interface';
import { AsesoriaService } from '../services/asesoria.service';
import { Usuario } from '../model/usuario.interface';
import { Horario } from '../model/horario.interface';
import { Asignatura } from '../model/asignatura.interface';
import { HorarioService } from '../services/horario.service';
import { AsignaturaService } from '../services/asignatura.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-asesoria-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './asesoria-form.component.html',
  styleUrl: './asesoria-form.component.css'
})
export default class AsesoriaFormComponent implements OnInit {
 
  usuario: Usuario | null = null;
  email: string = '';
  minDate: string = '';
  horarios: any[] = [];
  asignaturas: any[] = [];

  //private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private asesoriaService=inject(AsesoriaService)
  private router=inject(Router);
  form?:FormGroup
  asesoria: any| null = null;
    static form: any;
  constructor(
    private horarioService: HorarioService,

    private asignaturaService :AsignaturaService,

    private usuarioService :UsuarioService,
    private fb: FormBuilder
    

  ) {


  
  }


  ngOnInit():void{
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Asegura formato "MM"
    const day = today.getDate().toString().padStart(2, '0'); // Asegura formato "DD"

    this.minDate = `${year}-${month}-${day}`; // Formato "YYYY-MM-DD"

    this.obtenerUsuario(); 
    this.loadHorarios();
    this.loadAsignaturas();

  

    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.asesoriaService.get(parseInt(id))
      .subscribe(asesoria=>{
        //console.log(asesoria)
        this.asesoria=asesoria
        var fechaformato = new Date(asesoria.fecha_asesoria)
       
        var fecha=new Date(`${fechaformato.getFullYear()}-${fechaformato.getMonth()+1}-${fechaformato.getDate()}`).toISOString().split('T')[0];
        
        this.form=this.fb.group({
          horario :[asesoria.horario.id_horario,[Validators.required]],
          tutor :[{"id_usuario":asesoria.tutor.id_usuario},[Validators.required]],
          asignatura :[asesoria.asignatura.id_asignatura,[Validators.required]],
          fecha_creacion :[new Date().toISOString().split('T')[0],[Validators.required]],
          fecha_asesoria :[fecha,[Validators.required]],
          ubicacion  :[asesoria.ubicacion,[Validators.required]],
          estado :['modificada',[Validators.required]],
          visibilidad :[asesoria.visibilidad,[Validators.required]],
          capacidad :[asesoria.capacidad,[Validators.required]],
        });


        })
    }else{
     
      const idUsuario: number = this.usuario?.id_usuario ?? 0; // Cambia 0 por el valor que desees
  
   

      
   
        this.form=this.fb.group({
          horario :['',[Validators.required]],
          tutor :[{"id_usuario":idUsuario},[Validators.required]],
          asignatura :['',[Validators.required]],
          fecha_creacion :[new Date().toISOString().split('T')[0],[Validators.required]],
          fecha_asesoria :['',[Validators.required]],
          ubicacion  :['',[Validators.required]],
          estado :['creada',[Validators.required]],
          visibilidad :['',[Validators.required]],
          capacidad :[0,[Validators.required]],
        });
      
    }
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
  


  
  loadHorarios(): void {
    this.horarioService.list().subscribe((data) => {
      this.horarios = data;
    });
  }

  loadAsignaturas(): void {
    this.asignaturaService.list().subscribe((data) => {
      this.asignaturas = data;
    });
  }
   

  save(){
    console.log(this.form)

   
    if (this.form?.valid  ) {
      const asesoriaForm=this.form?.value;
         asesoriaForm["horario"] = {"id_horario":asesoriaForm["horario"]}
         asesoriaForm["asignatura"] = {"id_asignatura":asesoriaForm["asignatura"]}
    
    
    if (this.asesoria) {
       
      this.asesoriaService.update(this.asesoria.id_asesoria,asesoriaForm).subscribe(()=>{
        this.router.navigate(['/listarasesoria'])
  
      })
    
      
    } else {
      

      this.asesoriaService.create(asesoriaForm).subscribe(()=>{
        this.router.navigate(['/listarasesoria'])
  
      })
    
      
    }
  
  }else{
  alert("faltan campos por completar")
  
  }
}

}
