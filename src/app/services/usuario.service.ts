import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Usuario } from '../model/usuario.interface';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http=inject(HttpClient);

  list(correo :string | null){
    return this.http.get<Usuario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/usuarioporcorreo/${correo}`)
  }
  generatoken(correo :string | null){
    return this.http.get<string>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/generartoken/${correo}`, { responseType: 'text' as 'json' })
  }
  get(id: number){
    return this.http.get<Usuario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`);
  }
  create(usuario: Usuario){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Usuario>('https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios',usuario,{headers})
  }
  update(id: number,usuario: Usuario){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put<Usuario>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`,usuario,{headers})
  }
  delete(id:number){
    const token = localStorage.getItem('jwtToken');

    // Configurar los headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios/${id}`,{headers})
  }
  constructor() {
    // Inicializa el estado con el usuario del localStorage si existe
    const usuario = this.getUsuarioFromStorage();
    if (usuario) {
      this.setUsuario(usuario);
    }
  }

///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https
private usuarioSubject = new BehaviorSubject<Usuario | null>(null); 

usuario$ = this.usuarioSubject.asObservable(); // Observable para el usuario

// Método para obtener el usuario
getUsuario(): Observable<Usuario | null> {
  return this.usuarioSubject.asObservable(); // Devuelve el Observable
}

// Método para actualizar el usuario
setUsuario(usuario: Usuario): void {
  this.usuarioSubject.next(usuario); // Actualiza el BehaviorSubject con el nuevo usuario
}

// Método para limpiar el usuario
clearUsuario(): void {
  this.usuarioSubject.next(null); // Limpia el usuario
}
 // Guarda el usuario en el localStorage
 private saveUsuarioToStorage(usuario: Usuario): void {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Obtiene el usuario del localStorage
private getUsuarioFromStorage(): Usuario | null {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

// Limpia el usuario del localStorage
private clearUsuarioFromStorage(): void {
  localStorage.removeItem('usuario');
}

}
