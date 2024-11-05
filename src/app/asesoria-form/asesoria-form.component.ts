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
  form2?: FormGroup
  usuario: Usuario | null = null;
  email: string = '';

  horarios: any[] = [];
  asignaturas: any[] = [];

  //private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private asesoriaService=inject(AsesoriaService)
  private router=inject(Router);
  form?:FormGroup
  asesoria: any| null = null;
  constructor(
    private horarioService: HorarioService,

    private asignaturaService :AsignaturaService,

    private usuarioService :UsuarioService,
    private fb: FormBuilder
    

  ) {
    this.form2 = this.fb.group({
      fk_id_horario: [null, Validators.required],
      fk_id_asignatura: [null, Validators.required]
    });

  
  }


  ngOnInit():void{

    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.loadHorarios();
    this.loadAsignaturas();
    this.form2?.get('fk_id_horario')?.valueChanges.subscribe(value => {
      
      this.form?.get('horario')?.setValue(parseInt(value,10))
      // Aquí puedes ejecutar cualquier lógica adicional que necesites
    });
    this.form2?.get('fk_id_asignatura')?.valueChanges.subscribe(value => {
      
      this.form?.get('asignatura')?.setValue(parseInt(value,10))
      // Aquí puedes ejecutar cualquier lógica adicional que necesites
    });


    const id=this.route.snapshot.paramMap.get('id');
    if(id){
      this.asesoriaService.get(parseInt(id))
      .subscribe(asesoria=>{
        console.log(asesoria)
        this.asesoria=asesoria
        var fechaformato = new Date(asesoria.fecha_asesoria)
       
        var fecha=new Date(`${fechaformato.getFullYear()}-${fechaformato.getMonth()+1}-${fechaformato.getDate()}`).toISOString().split('T')[0];
        
        this.form=this.fb.group({
          horario :[asesoria.horario.id_horario,[Validators.required]],
          tutor :[asesoria.tutor.id_usuario,[Validators.required]],
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

        this.form=this.fb.group({
          horario :['',[Validators.required]],
          tutor :['',[Validators.required]],
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
    
    const asesoriaForm=this.form!.value;
    const idUsuario: number = this.usuario?.id_usuario ?? 0; // Cambia 0 por el valor que desees
    asesoriaForm["tutor"] ={"id_usuario":idUsuario};
 
    asesoriaForm["horario"] = {"id_horario":asesoriaForm["horario"]}
    asesoriaForm["asignatura"] = {"id_asignatura":asesoriaForm["asignatura"]}
  
    
    if (this.asesoria) {
      this.asesoriaService.update(this.asesoria.id_asesoria,asesoriaForm).subscribe(()=>{
        this.router.navigate(['/listarasesoria'])
  
      })
      
    } else {

      
   
      //console.log(asesoriaForm);
      this.asesoriaService.create(asesoriaForm).subscribe(()=>{
        this.router.navigate(['/dashboard'])
  
      })
      
    }
  }
  
  

}
