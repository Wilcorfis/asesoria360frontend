// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router
  ) {}
  ngOnInit() {
   
  }


  

  //constructor(private authService: AuthService) {}

}

