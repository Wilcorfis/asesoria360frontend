import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Asesoria } from '../model/asesoria.interface';

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Asesoria[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias')
  }
  get(id: number){
    return this.http.get<Asesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`);
  }
  create(asesoria: Asesoria){
    return this.http.post<Asesoria>('https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias',asesoria)
  }
  update(id: number,asesoria: Asesoria){
    return this.http.put<Asesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`,asesoria)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
