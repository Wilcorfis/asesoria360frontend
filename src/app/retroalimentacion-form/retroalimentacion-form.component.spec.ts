import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import  RetroalimentacionFormComponent  from './retroalimentacion-form.component';
import { UsuarioService } from '../services/usuario.service';
import { RetroalimentacionService } from '../services/retroalimentacion.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

// Mock de los servicios
const mockUsuario = {
  id_usuario: 1,
  primer_nombre: 'John',
  segundo_nmbre: 'Doe',
  primer_apellido: 'Smith',
  segundo_apellido: 'Johnson',
  rol: 'estudiante',
  codigotutor: '123',
  correo: 'john.doe@example.com',
  sexo: 'M',
  telefono: '1234567890',
  fecha_nacimiento: '1990-01-01',
  descripcion: 'A student'
};

const usuarioServiceMock = {
  getUsuario: () => of(mockUsuario) // Simula la respuesta de getUsuario
};

const retroalimentacionServiceMock = {
  create: jasmine.createSpy('create').and.returnValue(of({})) // Crea un espía para el método create
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate') // Simula la función de navegación
};

describe('RetroalimentacionFormComponent', () => {
  let component: RetroalimentacionFormComponent;
  let fixture: ComponentFixture<RetroalimentacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        RetroalimentacionFormComponent // Importa el componente standalone directamente
      ], 
      providers: [
        FormBuilder,
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: RetroalimentacionService, useValue: retroalimentacionServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetroalimentacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form correctly with data from usuario and route', () => {
    // Inicializa el componente
    component.ngOnInit();

    expect(component.form).toBeTruthy();
    expect(component.form?.get('estudiante')?.value).toEqual({ id_usuario: 1 });
    expect(component.form?.get('asesoria')?.value).toEqual({ id_asesoria: 1 });
    expect(component.form?.get('puntaje')?.valid).toBeFalsy(); // El puntaje es inicialmente inválido
  });

  it('should call retroalimentacionService.create when save is called', () => {
    // Simula un formulario válido
    const mockFormValue = {
      estudiante: { id_usuario: 1 },
      asesoria: { id_asesoria: 1 },
      puntaje: 5,
      comentarios: 'Great session!',
      fecha_retroalimentacion: new Date().toISOString().split('T')[0]
    };

    component.form?.setValue(mockFormValue);
    component.save();

    // Verifica que el servicio haya sido llamado con los datos correctos
    expect(retroalimentacionServiceMock.create).toHaveBeenCalledWith(mockFormValue);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/listarretroalimentacion']);
  });

 
});



