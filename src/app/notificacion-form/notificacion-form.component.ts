import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NotificacionService } from '../services/notificacion.service';
import { Notificacion } from '../model/notificacion.interface';

@Component({
  selector: 'app-notificacion-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './notificacion-form.component.html',
  styleUrl: './notificacion-form.component.css'
})
export default class NotificacionFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private notificacionService=inject(NotificacionService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
