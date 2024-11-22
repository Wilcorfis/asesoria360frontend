import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Horario } from '../model/horario.interface';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Horario[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/horarios')
  }
  get(id: number){
    return this.http.get<Horario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/horarios/${id}`);
  }
  create(horario: Horario){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Horario>('https://new-christen-wilcorfis-23727a02.koyeb.app/horarios',horario,{headers})
  }
  update(id: number,horario: Horario){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Horario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/horarios/${id}`,horario,{headers})
  }
  delete(id:number){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/horarios/${id}`,{headers})
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
