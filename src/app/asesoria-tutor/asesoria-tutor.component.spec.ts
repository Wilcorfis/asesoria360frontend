import { ComponentFixture, TestBed } from '@angular/core/testing';
import  AsesoriaTutorComponent  from './asesoria-tutor.component'; // Importamos el componente standalone
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AsesoriaTutorComponent', () => {
  let component: AsesoriaTutorComponent;
  let fixture: ComponentFixture<AsesoriaTutorComponent>;

  // Servicios mockeados
  const mockUsuarioService = {
    getUsuario: () => of({ id_usuario: 1, nombre: 'Juan' })
  };

  const mockAsesoriaService = {
    getbyidtutor: (id: number) => of([
      {
        id_asesoria: 1,
        fecha_asesoria: '2024-11-15',
        ubicacion: 'Sala 101',
        cont: 10,
        asignatura: { nombre: 'Matemáticas' },
        tutor: { correo: 'juan@tutor.com' },
        horario: { hora_inicio: '10:00', hora_fin: '12:00' }
      }
    ])
  };

  const mockSuscripcionAsesoriaService = {
    contarestudiante: (id: number) => of(10)
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ // Usamos imports para cargar el componente standalone
        AsesoriaTutorComponent, // Importamos directamente el componente standalone
        CommonModule, // Aseguramos que los módulos necesarios están incluidos
        RouterModule,
        DatePipe
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: AsesoriaService, useValue: mockAsesoriaService },
        { provide: SuscripcionasesoriaService, useValue: mockSuscripcionAsesoriaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsesoriaTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detectar cambios después de crear el componente
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load calendar and highlight dates with asesorias', () => {
    component.loadCalendar();
    fixture.detectChanges();

    // Verifica que el calendario tenga la fecha resaltada
    const daysWithAssistance = fixture.debugElement.queryAll(By.css('.bg-primary'));
    expect(daysWithAssistance.length).toBeGreaterThan(0);
  });

  it('should show asesoria details in the calendar', () => {
    component.cargarAsesorias();
    fixture.detectChanges();

    const asesoriaDetails = fixture.debugElement.queryAll(By.css('.text-dark'));
    expect(asesoriaDetails.length).toBeGreaterThan(0);
    expect(asesoriaDetails[0].nativeElement.textContent).toContain('Matemáticas');
    expect(asesoriaDetails[0].nativeElement.textContent).toContain('juan@tutor.com');
    expect(asesoriaDetails[0].nativeElement.textContent).toContain('10:00');
  });

  it('should navigate to previous month', () => {
    const currentDateBefore = component.currentDate;
    component.prevMonth();
    expect(component.currentDate.getMonth()).toBe(currentDateBefore.getMonth() - 1);
  });

  it('should navigate to next month', () => {
    const currentDateBefore = component.currentDate;
    component.nextMonth();
    expect(component.currentDate.getMonth()).toBe(currentDateBefore.getMonth() + 1);
  });
});



