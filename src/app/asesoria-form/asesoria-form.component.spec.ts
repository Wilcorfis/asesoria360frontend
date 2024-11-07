import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Si usas formularios reactivos
import { By } from '@angular/platform-browser'; // Para interactuar con el DOM

import {  FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { HorarioService } from '../services/horario.service';
import { AsignaturaService } from '../services/asignatura.service';
import { of } from 'rxjs';
import AsesoriaFormComponent from './asesoria-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AsesoriaFormComponent', () => {
  let component: AsesoriaFormComponent;
  let fixture: ComponentFixture<AsesoriaFormComponent>;

  // Mock de los servicios necesarios
  const mockUsuarioService = {
    getUsuario: jasmine.createSpy('getUsuario').and.returnValue(of({ id_usuario: 1 })),
  };
  
  const mockAsesoriaService = {
    get: jasmine.createSpy('get').and.returnValue(of({})),
    update: jasmine.createSpy('update').and.returnValue(of({})),
    create: jasmine.createSpy('create').and.returnValue(of({})),
  };
  
  const mockHorarioService = {
    list: jasmine.createSpy('list').and.returnValue(of([{ id_horario: 1 }])),
  };
  
  const mockAsignaturaService = {
    list: jasmine.createSpy('list').and.returnValue(of([{ id_asignatura: 1 }])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsesoriaFormComponent, // Asegúrate de que está en imports, no en declarations
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule // Necesario para HttpClient en el test
      ],
      providers: [
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: AsesoriaService, useValue: mockAsesoriaService },
        { provide: HorarioService, useValue: mockHorarioService },
        { provide: AsignaturaService, useValue: mockAsignaturaService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsesoriaFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should load horarios on initialization', () => {
    component.ngOnInit();
    expect(mockHorarioService.list).toHaveBeenCalled();
    expect(component.horarios.length).toBeGreaterThan(0);
  });

  it('should load asignaturas on initialization', () => {
    component.ngOnInit();
    expect(mockAsignaturaService.list).toHaveBeenCalled();
    expect(component.asignaturas.length).toBeGreaterThan(0);
  });

 /* it('should call save() and create a new asesoria if asesoria is null', () => {
    component.form?.setValue({
      horario: '1',
      tutor: '1',
      asignatura: '1',
      fecha_creacion: '2024-01-01',
      fecha_asesoria: '2024-01-01',
      ubicacion: 'Aula 101',
      estado: 'creada',
      visibilidad: 'publica',
      capacidad: 20
    });
    component.save();
    expect(mockAsesoriaService.create).toHaveBeenCalled();
  });

  it('should call save() and update asesoria if asesoria is not null', () => {
    component.asesoria = { id_asesoria: 1 };
    component.form?.setValue({
      horario: '1',
      tutor: '1',
      asignatura: '1',
      fecha_creacion: '2024-01-01',
      fecha_asesoria: '2024-01-01',
      ubicacion: 'Aula 101',
      estado: 'modificada',
      visibilidad: 'privada',
      capacidad: 15
    });
    component.save();
    expect(mockAsesoriaService.update).toHaveBeenCalledWith(1, jasmine.any(Object));
  });

  it('should update form values when fk_id_horario changes', () => {
    component.form2?.get('fk_id_horario')?.setValue('1');
    fixture.detectChanges();
    expect(component.form?.get('horario')?.value).toBe(1);
  });

  it('should update form values when fk_id_asignatura changes', () => {
    component.form2?.get('fk_id_asignatura')?.setValue('1');
    fixture.detectChanges();
    expect(component.form?.get('asignatura')?.value).toBe(1);
  });
  */
});

