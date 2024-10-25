import { Component, OnInit, inject } from '@angular/core';
import { AsignaturaService } from '../services/asignatura.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Asignatura } from '../model/asignatura.interface';

@Component({
  selector: 'app-asignatura-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './asignatura-list.component.html',
  styleUrl: './asignatura-list.component.css'
})
export default class AsignaturaListComponent implements OnInit {
  private asignaturaService=inject(AsignaturaService);

  ngOnInit(): void {
   

  }
  
}
