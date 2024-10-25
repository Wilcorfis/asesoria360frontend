import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsesoriaService } from '../services/asesoria.service';
import { Asesoria } from '../model/asesoria.interface';

@Component({
  selector: 'app-asesoria-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './asesoria-form.component.html',
  styleUrl: './asesoria-form.component.css'
})
export default class AsesoriaFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private asesoriaService=inject(AsesoriaService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
