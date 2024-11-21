import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { Asesoria } from '../model/asesoria.interface';
import { AuthService } from '../services/auth.service';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-asesoria-list',
  standalone: true,
  imports: [DatePipe,RouterModule,ReactiveFormsModule],
  templateUrl: './asesoria-list.component.html',
  styleUrl: './asesoria-list.component.css'
})
export default class AsesoriaListComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  asesoria:any[]=[];
  filteredAsesorias: any[] = [];
  filterForm: FormGroup;
  suscripcion:any | null=null

  
  usuario: Usuario| null = null;

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,
    private asesoriaService :AsesoriaService,
    private suscripcionService:SuscripcionasesoriaService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      tutor: [''],
      asignatura: [''],
      fechaDesde: [''], // Fecha inicial del rango
      fechaHasta: [''], // Fecha final del rango
    });
  }
 
  

  ngOnInit(): void {
    this.obtenerUsuario();
    


    this.loadAll();
    this.filterForm.valueChanges.subscribe((filters) => {
      this.applyFilters(filters);
    });

  }
  applyFilters(filters: any): void {
    this.filteredAsesorias = this.asesoria.filter((asesoria) => {
      const matchesTutor =
        !filters.tutor ||
        `${asesoria.tutor.primer_nombre} ${asesoria.tutor.primer_apellido}`
          .toLowerCase()
          .includes(filters.tutor.toLowerCase());
      const matchesAsignatura =
        !filters.asignatura ||
        asesoria.asignatura.nombre.toLowerCase().includes(filters.asignatura.toLowerCase());

      const matchesFechaDesde =
        !filters.fechaDesde ||
        new Date(asesoria.fecha_asesoria) > new Date(filters.fechaDesde);
      const matchesFechaHasta =
        !filters.fechaHasta ||
        new Date(asesoria.fecha_asesoria) <= new Date(filters.fechaHasta);

      return matchesTutor && matchesAsignatura && matchesFechaDesde && matchesFechaHasta;
    });
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
  

 
  loadAll(){   
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    this.asesoriaService.list()
    .subscribe(asesorias=>{
      this.asesoria=asesorias;
      this.filteredAsesorias =asesorias;
      this.suscripcionService.getbyidusuario(idUsuario).subscribe(suscri=>{
        this.suscripcion=suscri;
      }
          

      )
   

     
    });
  }
  deleteasesoria(ase: Asesoria){
    this.asesoriaService.delete(ase.id_asesoria)
    .subscribe(()=>{
      this.loadAll();

    })
  }

}
