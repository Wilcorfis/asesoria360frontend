import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { Asesoria } from '../model/asesoria.interface';
import { AuthService } from '../services/auth.service';
import { RetroalimentacionService } from '../services/retroalimentacion.service';



@Component({
  selector: 'app-asesoria-estudiante',
  standalone: true,
  imports: [DatePipe,RouterModule,CommonModule],
  templateUrl: './asesoria-estudiante.component.html',
  styleUrl: './asesoria-estudiante.component.css'

})
export default class AsesoriaEstudianteComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  calendarWeeks: any[][] = [];
  asesoria:any[]=[]; // Array para almacenar las asesorías
  usuario: Usuario| null = null;
  retroalimentacion: any| null = null;
  isLoggedIn: boolean = false;
  currentDate: Date = new Date();
  events: { [key: string]: string } = {};
  highlightedDates: Set<string> = new Set();
  cont: number | 0=0;


  asesoriasPorFecha: { [key: string]: any[] } = {}; // Almacena asesorías por fecha

  isModalOpen: boolean = false;
    
  openEventModal(asesorias: any[]) {
    
    this.isModalOpen = true; // Mostrar modal

  }
  closeModal() {
    this.isModalOpen = false; // Ocultar modal
  }

  loadCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const calendarDays: any[] = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Asociar las asesorías del día, si existen
      const asesorias = this.asesoriasPorFecha[dateKey] || [];
      const isToday = false; // No resaltar la fecha actual

      calendarDays.push({
        day,
        dateKey,
        isToday,
        asesorias // Asociar asesorías del día
      });
    }

    this.calendarWeeks = [];
    while (calendarDays.length > 0) {
      this.calendarWeeks.push(calendarDays.splice(0, 7));
    }
  }

  // Método para configurar las asesorías y resaltar las fechas en el calendario
  cargarAsesorias(): void {
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    this.asesoriaService.getbyidestudiante(idUsuario).subscribe(asesorias => {
      //console.log(asesorias)

      this.asesoria=asesorias;
      this.highlightDates(asesorias); // Llama al método para resaltar las fechas de asesorías
    });
  }

  // Método para resaltar las fechas de asesorías
  highlightDates(asesorias: any[]): void {
    this.asesoriasPorFecha = {}
    asesorias.forEach(asesoria => {
           // Convertir fecha de la asesoría al formato 'yyyy-MM-dd'
           const fechaformato = new Date(asesoria.fecha_asesoria);
        
          
           var fecha=new Date(`${fechaformato.getFullYear()}-${fechaformato.getMonth()+1}-${fechaformato.getDate()}`).toISOString().split('T')[0];
           if (!this.asesoriasPorFecha[fecha]) {
            this.asesoriasPorFecha[fecha] = [];
          }
          this.asesoriasPorFecha[fecha].push(asesoria);
    });
    this.loadCalendar(); // Recargar el calendario para aplicar los cambios
  }
    // Método para contar asesorías por dia

 

  prevMonth() {
    const current = new Date(this.currentDate);
    current.setMonth(current.getMonth() - 1);
    this.currentDate = current;
    this.loadCalendar(); // Llama a tu método para cargar el calendario
  }

  // Método para navegar al mes siguiente
  nextMonth() {
    const current = new Date(this.currentDate);
    current.setMonth(current.getMonth() + 1);
    this.currentDate = current;
    this.loadCalendar(); // Llama a tu método para cargar el calendario
  }


  constructor(private authService: AuthService,
    private asesoriaService :AsesoriaService,
    private retroalimentacionService :RetroalimentacionService
  ) {}
 
  

  ngOnInit(): void {

    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loadCalendar();
    //this.loadAll();
    this.cargarAsesorias();
    const idUsuario: number = this.usuario?.id_usuario ?? 0;
    this.retroalimentacionService.getporidusuario2(idUsuario).subscribe(
      retro=>{
        this.retroalimentacion=retro
        //console.log(retro);
      }
     
    )
  }
  countAsesoriasInDay(dateKey: string): number {
    return Array.isArray(this.asesoriasPorFecha[dateKey]) ? this.asesoriasPorFecha[dateKey].length : 0;
  }

 
  loadAll(){


    this.asesoriaService.getbyidestudiante(this.usuario!.id_usuario)
    .subscribe(asesorias=>{

      this.asesoria=asesorias;
    });
  }

}