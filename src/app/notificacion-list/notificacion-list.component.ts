import { Component, OnInit, inject } from '@angular/core';
import { NotificacionService } from '../services/notificacion.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Notificacion } from '../model/notificacion.interface';

@Component({
  selector: 'app-notificacion-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './notificacion-list.component.html',
  styleUrl: './notificacion-list.component.css'
})
export default class NotificacionListComponent implements OnInit {
  private notificacionService=inject(NotificacionService);

  ngOnInit(): void {
   

  }
  
}
