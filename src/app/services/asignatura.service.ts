import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Asignatura } from '../model/asignatura.interface';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Asignatura[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas')
  }
  get(id: number){
    return this.http.get<Asignatura>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas/${id}`);
  }
  create(asignatura: Asignatura){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Asignatura>('https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas',asignatura,{headers})
  }
  update(id: number,asignatura: Asignatura){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Asignatura>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas/${id}`,asignatura,{headers})
  }
  delete(id:number){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas/${id}`,{headers})
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
