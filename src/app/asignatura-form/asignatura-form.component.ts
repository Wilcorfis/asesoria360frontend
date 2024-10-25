import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsignaturaService } from '../services/asignatura.service';
import { Asignatura } from '../model/asignatura.interface';

@Component({
  selector: 'app-asignatura-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './asignatura-form.component.html',
  styleUrl: './asignatura-form.component.css'
})
export default class AsignaturaFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private asignaturaService=inject(AsignaturaService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
