import { ComponentFixture, TestBed } from '@angular/core/testing';
import AsesoriaFormComponent  from './asesoria-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AsesoriaService } from '../services/asesoria.service';
import { HorarioService } from '../services/horario.service';
import { AsignaturaService } from '../services/asignatura.service';
import { UsuarioService } from '../services/usuario.service';

describe('AsesoriaFormComponent', () => {
  let component: AsesoriaFormComponent;
  let fixture: ComponentFixture<AsesoriaFormComponent>;

  // Mock services
  const mockAsesoriaService = {
    get: (id: number) => of({ id_asesoria: id, horario: { id_horario: 1 }, tutor: { id_usuario: 1 }, asignatura: { id_asignatura: 1 }, fecha_asesoria: '2023-12-01', ubicacion: 'Aula 101', estado: 'creada', visibilidad: 'publico', capacidad: 10 }),
    create: (asesoria: any) => of({}),
    update: (id: number, asesoria: any) => of({})
  };
  
  const mockHorarioService = {
    list: () => of([{ id_horario: 1, hora_inicio: '08:00', hora_fin: '10:00' }])
  };

  const mockAsignaturaService = {
    list: () => of([{ id_asignatura: 1, nombre: 'Matemáticas' }])
  };

  const mockUsuarioService = {
    getUsuario: () => of({ id_usuario: 1, nombre: 'Test User' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsesoriaFormComponent, // Component standalone
        ReactiveFormsModule, 
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: AsesoriaService, useValue: mockAsesoriaService },
        { provide: HorarioService, useValue: mockHorarioService },
        { provide: AsignaturaService, useValue: mockAsignaturaService },
        { provide: UsuarioService, useValue: mockUsuarioService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsesoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values for a new asesoria', () => {
    component.ngOnInit();
    expect(component.form?.get('horario')?.value).toBe('');
    expect(component.form?.get('estado')?.value).toBe('creada');
    expect(component.form?.get('capacidad')?.value).toBe(0);
  });

  it('should load horarios on initialization', () => {
    component.ngOnInit();
    expect(component.horarios.length).toBeGreaterThan(0);
    expect(component.horarios[0].id_horario).toBe(1);
  });

  it('should load asignaturas on initialization', () => {
    component.ngOnInit();
    expect(component.asignaturas.length).toBeGreaterThan(0);
    expect(component.asignaturas[0].id_asignatura).toBe(1);
  });

  it('should call asesoriaService.create when creating a new asesoria', () => {
    component.ngOnInit();
    component.form?.patchValue({
      horario: 1,
      asignatura: 1,
      fecha_asesoria: '2023-12-01',
      ubicacion: 'Aula 101',
      visibilidad: 'publico',
      capacidad: 10
    });

    spyOn(mockAsesoriaService, 'create').and.callThrough();
    component.save();
    expect(mockAsesoriaService.create).toHaveBeenCalled();
  });

  it('should call asesoriaService.update when updating an existing asesoria', () => {
    component.ngOnInit();
    component.asesoria = { id_asesoria: 1 };
    component.form?.patchValue({
      horario: 1,
      asignatura: 1,
      fecha_asesoria: '2023-12-01',
      ubicacion: 'Aula 101',
      visibilidad: 'publico',
      capacidad: 10
    });

    spyOn(mockAsesoriaService, 'update').and.callThrough();
    component.save();
    expect(mockAsesoriaService.update).toHaveBeenCalledWith(1, jasmine.any(Object));
  });
});


