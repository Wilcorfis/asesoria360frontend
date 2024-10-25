import { Component, OnInit, inject } from '@angular/core';
import { AsesoriaService } from '../services/asesoria.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Asesoria } from '../model/asesoria.interface';

@Component({
  selector: 'app-asesoria-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './asesoria-list.component.html',
  styleUrl: './asesoria-list.component.css'
})
export default class AsesoriaListComponent implements OnInit {
  private asesoriaService=inject(AsesoriaService);

  ngOnInit(): void {
   

  }
  
}
