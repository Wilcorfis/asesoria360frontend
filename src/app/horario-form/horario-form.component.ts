import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HorarioService } from '../services/horario.service';
import { Horario } from '../model/horario.interface';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './horario-form.component.html',
  styleUrl: './horario-form.component.css'
})
export default class HorarioFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private horarioService=inject(HorarioService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
