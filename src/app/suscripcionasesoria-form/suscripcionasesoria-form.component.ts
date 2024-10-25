import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';

@Component({
  selector: 'app-suscripcionasesoria-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './suscripcionasesoria-form.component.html',
  styleUrl: './suscripcionasesoria-form.component.css'
})
export default class SuscripcionasesoriaFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private suscripcionasesoriaService=inject(SuscripcionasesoriaService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
