import { HttpClient } from '@angular/common/http';
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
    return this.http.post<Horario>('https://new-christen-wilcorfis-23727a02.koyeb.app/horarios',horario)
  }
  update(id: number,horario: Horario){
    return this.http.put<Horario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/horarios/${id}`,horario)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/horarios/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
