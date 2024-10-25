import { Component, OnInit, inject } from '@angular/core';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';

@Component({
  selector: 'app-susripcionasesoria-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './suscripcionasesoria-list.component.html',
  styleUrl: './suscripcionasesoria-list.component.css'
})
export default class SuscripcionasesoriaListComponent implements OnInit {
  private suscripcionasesoriaService=inject(SuscripcionasesoriaService);

  ngOnInit(): void {
   

  }
  
}
