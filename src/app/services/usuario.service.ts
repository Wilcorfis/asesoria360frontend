import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Usuario[]>('http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios')
  }
  get(id: number){
    return this.http.get<Usuario>('http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}');
  }
  create(usuario: any){
    return this.http.post<Usuario>('http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios',usuario)
  }
  update(id: number,usuario: any){
    return this.http.put<Usuario>('http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}',usuario)
  }
  delete(id:number){
    return this.http.delete<void>('http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}')
  }
///localhost:8080
//http://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
