import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getporidusuario2(id: number){
    return this.http.get<Retroalimentacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/retroalimentaionporidusuario2/${id}`);
  }

  getporidtutor(id: number){
    return this.http.get<Retroalimentacion[]>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/retroalimentaionporidtutor/${id}`);
  }

  getporidusuario(id: number){
    return this.http.get<Retroalimentacion[]>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/retroalimentaionporidusuario/${id}`);
  }
  get(id: number){
    return this.http.get<any>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`);
  }
  create(retroalimentacion: Retroalimentacion){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Retroalimentacion>('https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones',retroalimentacion,{headers})
  }
  update(id: number,retroalimentacion: Retroalimentacion){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Retroalimentacion>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`,retroalimentacion,{headers})
  }
  delete(id:number){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/retroalimentaciones/${id}`,{headers})
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
