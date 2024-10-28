import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [DatePipe,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean =false;
 
  private route=inject(ActivatedRoute);
  private afAuth = inject(AngularFireAuth);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      this.isLoggedIn = params['esValido'] || '';
    });


}
cerrarSesion(): void {
  this.afAuth.signOut();
  sessionStorage.removeItem('correo');
  sessionStorage.removeItem("isLoggedIn");
  this.router.navigate(['']);
}
}
