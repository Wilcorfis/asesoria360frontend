import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Asesoria } from '../model/asesoria.interface';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  constructor(private http: HttpClient) { }

 
  list(){
    return this.http.get<Asesoria[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias')
  }
  getbyidtutor(id: number){ 
    return this.http.get<Asesoria[]>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/tutor/${id}`)  
  }
  getbyidestudiante(id: number){
    return this.http.get<Asesoria[]>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/estudiante/${id}`)
  }
  get(id: number){
    return this.http.get<any>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`);
  }
  create(asesoria: Asesoria){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Asesoria>('https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias',asesoria,{headers})
  }
  update(id: number,asesoria: Asesoria){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Asesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`,asesoria,{headers})
  }
  delete(id:number){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`,{headers})
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
