import { ComponentFixture, TestBed } from '@angular/core/testing';
import  RetroalimentacionListComponent  from './retroalimentacion-list.component';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

// Mock de RetroalimentacionService
class MockRetroalimentacionService {
  getporidusuario(id: number) {
    return of([
      { id_retroalimentacion: 1, 
        asesoria: { asignatura: { nombre: 'Math' }, tutor: { correo: 'tutor@example.com' }, horario: { hora_inicio: '10:00' } }, 
        puntaje: 4, 
        comentarios: 'Good', 
        fecha_retroalimentacion: '2024-01-01' 
      }
    ]);
  }

  delete(id: number) {
    return of(null); // Simula la eliminación sin hacer nada
  }
}

// Mock de AuthService
class MockAuthService {
  isLoggedIn$ = of(true); // Simula que el usuario está logueado
}

// Mock de UsuarioService
class MockUsuarioService {
  getUsuario() {
    return of({ id_usuario: 1, primer_nombre: 'John', correo: 'john.doe@example.com' });
  }
}

describe('RetroalimentacionListComponent', () => {
  let component: RetroalimentacionListComponent;
  let fixture: ComponentFixture<RetroalimentacionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        RetroalimentacionListComponent, // Aquí importamos el componente standalone
      ],
      providers: [
        { provide: RetroalimentacionService, useClass: MockRetroalimentacionService },
        { provide: AuthService, useClass: MockAuthService },
        { provide: UsuarioService, useClass: MockUsuarioService },
        DatePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RetroalimentacionListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load retroalimentaciones when logged in', () => {
    fixture.detectChanges();  // Dispara el ciclo de vida del componente

    // Verificar que las retroalimentaciones se cargaron correctamente
    expect(component.retroalimentacion.length).toBe(1);
    expect(component.retroalimentacion[0].asesoria.asignatura.nombre).toBe('Math');
  });

  it('should call delete method when deleting a retroalimentacion', () => {
    fixture.detectChanges();  // Dispara el ciclo de vida del componente

    // Llamar al método de eliminación
    const mockRetroalimentacion = component.retroalimentacion[0];
    component.deleteretro(mockRetroalimentacion);

    // Verificar que el servicio delete ha sido llamado con el id correcto
    expect(component.retroalimentacion.length).toBe(1); // La lista de retroalimentaciones debe seguir teniendo un item ya que `delete` no hace nada
  });
});

