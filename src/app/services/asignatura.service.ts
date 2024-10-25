import { HttpClient } from '@angular/common/http';
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
    return this.http.post<Asignatura>('https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas',asignatura)
  }
  update(id: number,asignatura: Asignatura){
    return this.http.put<Asignatura>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas/${id}`,asignatura)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asignaturas/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
