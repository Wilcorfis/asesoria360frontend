import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { Retroalimentacion } from '../model/retroalimentacion.interface';

@Component({
  selector: 'app-retroalimentacion-form',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './retroalimentacion-form.component.html',
  styleUrl: './retroalimentacion-form.component.css'
})
export default class RetroalimentacionFormComponent implements OnInit {
  private fb=inject(FormBuilder);
  private route=inject(ActivatedRoute);
  private retroalimentacionService=inject(RetroalimentacionService)
  private router=inject(Router);

  ngOnInit():void{
  
  }
  

}
