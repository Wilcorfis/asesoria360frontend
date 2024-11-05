import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { Suscripcionasesoria } from '../model/suscripcionasesoria.interface';

@Injectable({
  providedIn: 'root'
})
export class SuscripcionasesoriaService {
  private http=inject(HttpClient);

  list(){
    return this.http.get<Suscripcionasesoria[]>('https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria')
  }
  get(id: number){
    return this.http.get<Suscripcionasesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria/${id}`);
  }
  contarestudiante(id: number){
    return this.http.get<any>(`https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria/contar-estudiantes/${id}`);
  }
  getbyidusuario(id: number){
    return this.http.get<Suscripcionasesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria/suscripcionporidusuario/${id}`);
  }
  create(suscripcionasesoria: Suscripcionasesoria){
    return this.http.post<Suscripcionasesoria>('https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria',suscripcionasesoria)
  }
  update(id: number,suscripcionasesoria: Suscripcionasesoria){
    return this.http.put<Suscripcionasesoria>(`https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria/${id}`,suscripcionasesoria)
  }
  delete(id:number){
    return this.http.delete<void>(`https://new-christen-wilcorfis-23727a02.koyeb.app/suscripcionasesoria/${id}`)
  }
///http://localhost:8080
//https://new-christen-wilcorfis-23727a02.koyeb.app/usuarios
//https

}
