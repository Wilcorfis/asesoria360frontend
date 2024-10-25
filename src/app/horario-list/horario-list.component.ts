import { Component, OnInit, inject } from '@angular/core';
import { HorarioService } from '../services/horario.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Horario } from '../model/horario.interface';

@Component({
  selector: 'app-horario-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './horario-list.component.html',
  styleUrl: './horario-list.component.css'
})
export default class HorarioListComponent implements OnInit {
  private horarioService=inject(HorarioService);

  ngOnInit(): void {
   

  }
  
}
