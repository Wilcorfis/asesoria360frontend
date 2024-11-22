import { Component, OnInit, inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Usuario } from '../model/usuario.interface';
import { Asesoria } from '../model/asesoria.interface';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-asesoria-tutor',
  standalone: true,
  imports: [DatePipe,RouterModule,CommonModule],
  templateUrl: './asesoria-tutor.component.html',
  styleUrl: './asesoria-tutor.component.css'

})
export default class AsesoriaTutorComponent implements OnInit {
  private usuarioService=inject(UsuarioService);
  private suscripcionService=inject(SuscripcionasesoriaService);
  calendarWeeks: any[][] = [];
  asesoria:any[]=[]; // Array para almacenar las asesorías
  usuario: Usuario| null = null;
  isLoggedIn: boolean = false;
  currentDate: Date = new Date();
  events: { [key: string]: string } = {};
  highlightedDates: Set<string> = new Set();


  asesoriasPorFecha: { [key: string]: any[] } = {}; // Almacena asesorías por fecha
  

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
    this.asesoriaService.getbyidtutor(idUsuario).subscribe(asesorias => {
      //console.log(asesorias)
      this.asesoria=asesorias;
      this.highlightDates(asesorias); // Llama al método para resaltar las fechas de asesorías
    });
  }
extractAndFormatDate(string: string) {
    // Expresión regular para fechas en formato yyyy-mm-dd o similar
    const dateRegex = /(\d{4})[-\/](\d{2})[-\/](\d{2})/;
    const match = string.match(dateRegex);

    if (match) {
        const [_, year, month, day] = match;
        // Crear un string con el formato deseado
        return `${year}-${month}-${day}`;
    } else {
        throw new Error("No se encontró una fecha válida en el string.");
    }
}



  // Método para resaltar las fechas de asesorías
  highlightDates(asesorias: any[]): void {
    this.asesoriasPorFecha = {}
    asesorias.forEach(asesoria => {
           // Convertir fecha de la asesoría al formato 'yyyy-MM-dd'
           const fechaformato = this.extractAndFormatDate(asesoria.fecha_asesoria);
           this.suscripcionService.contarestudiante(asesoria.id_asesoria).subscribe(
            cont=>{
        
              asesoria.cont=cont
            }
           )
        
          
           var fecha=fechaformato
           if (!this.asesoriasPorFecha[fecha]) {
            this.asesoriasPorFecha[fecha] = [];
          }
          this.asesoriasPorFecha[fecha].push(asesoria);
    });
    this.loadCalendar(); // Recargar el calendario para aplicar los cambios
  }

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
    private asesoriaService :AsesoriaService
  ) {}
 
  

  ngOnInit(): void {

    
    this.usuarioService.getUsuario().subscribe((usuario) => {
      this.usuario = usuario; // Almacenar el usuario en la variable
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.loadCalendar();
    this.cargarAsesorias();
  }



}
