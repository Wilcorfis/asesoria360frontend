import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Usuario[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios')
  }
  get(id: number){
    return this.http.get<Usuario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`);
  }
  create(usuario: Usuario){
    return this.http.post<Usuario>('https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios',usuario)
  }
  update(id: number,usuario: Usuario){
    return this.http.put<Usuario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`,usuario)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
