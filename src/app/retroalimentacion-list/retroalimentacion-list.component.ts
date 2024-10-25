import { Component, OnInit, inject } from '@angular/core';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Retroalimentacion } from '../model/retroalimentacion.interface';

@Component({
  selector: 'app-retroalimentacion-list',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './retroalimentacion-list.component.html',
  styleUrl: './retroalimentacion-list.component.css'
})
export default class RetroalimentacionListComponent implements OnInit {
  private retroalimentacionService=inject(RetroalimentacionService);

  ngOnInit(): void {
   

  }
  
}
