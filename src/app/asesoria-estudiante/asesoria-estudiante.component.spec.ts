import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import  AsesoriaEstudianteComponent  from './asesoria_estudiante.component';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { AuthService } from '../services/auth.service';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('AsesoriaEstudianteComponent', () => {
  let component: AsesoriaEstudianteComponent;
  let fixture: ComponentFixture<AsesoriaEstudianteComponent>;

  // Mocking real service behavior without spyObj
  const mockUsuarioService = {
    getUsuario: () => of({ id_usuario: 1 })
  };

  const mockAsesoriaService = {
    getbyidestudiante: (id: number) => of([{ fecha_asesoria: '2024-11-11' }])
  };

  const mockAuthService = {
    isLoggedIn$: of(true)
  };

  const mockRetroalimentacionService = {
    getporidusuario2: (id: number) => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsesoriaEstudianteComponent,
        DatePipe,
        RouterModule
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: AsesoriaService, useValue: mockAsesoriaService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: RetroalimentacionService, useValue: mockRetroalimentacionService },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriaEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cambiar al mes anterior', () => {
    const initialMonth = component.currentDate.getMonth();
    component.prevMonth();
    fixture.detectChanges();

    expect(component.currentDate.getMonth()).toBe(initialMonth - 1);
  });

  it('debería cambiar al mes siguiente', () => {
    const initialMonth = component.currentDate.getMonth();
    component.nextMonth();
    fixture.detectChanges();

    expect(component.currentDate.getMonth()).toBe(initialMonth + 1);
  });


});
