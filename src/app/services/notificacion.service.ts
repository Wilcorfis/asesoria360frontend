import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Notificacion } from '../model/notificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Notificacion[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/notificaciones')
  }
  get(id: number){
    return this.http.get<Notificacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/notificaciones/${id}`);
  }
  create(notificacion: Notificacion){
    return this.http.post<Notificacion>('https://new-christen-wilcorfis-23727a02.koyeb.app/notificaciones',notificacion)
  }
  update(id: number,notificacion: Notificacion){
    return this.http.put<Notificacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/notificaciones/${id}`,notificacion)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/notificaciones/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
