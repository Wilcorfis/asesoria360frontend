import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Retroalimentacion } from '../model/retroalimentacion.interface';

@Injectable({
  providedIn: 'root'
})
export class RetroalimentacionService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Retroalimentacion[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones')
  }

  getporidusuario(id: number){
    return this.http.get<Retroalimentacion[]>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/retroalimentaionporidusuario/${id}`);
  }
  get(id: number){
    return this.http.get<Retroalimentacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`);
  }
  create(retroalimentacion: Retroalimentacion){
    return this.http.post<Retroalimentacion>('https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones',retroalimentacion)
  }
  update(id: number,retroalimentacion: Retroalimentacion){
    return this.http.put<Retroalimentacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`,retroalimentacion)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
