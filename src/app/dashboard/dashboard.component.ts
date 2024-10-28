// src/app/components/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;

  //constructor(private authService: AuthService) {}

  ngOnInit(): void {
    //this.isLoggedIn = this.authService.isAuthenticated();
  }
}

