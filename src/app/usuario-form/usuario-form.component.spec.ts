import { ComponentFixture, TestBed } from '@angular/core/testing';
import  UsuarioFormComponent  from './usuario-form.component'; // Importamos el componente standalone
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('UsuarioFormComponent', () => {
  let component: UsuarioFormComponent;
  let fixture: ComponentFixture<UsuarioFormComponent>;

  // Mocked UsuarioService
  const mockUsuarioService = {
    get: (id: number) => of({
      id_usuario: id,
      primer_nombre: 'Juan',
      segundo_nmbre: 'Carlos',
      primer_apellido: 'Perez',
      segundo_apellido: 'Lopez',
      rol: 'Estudiante',
      codigotutor: '1234',
      correo: 'juanperez@example.com',
      sexo: 'Masculino',
      telefono: '1234567890',
      fecha_nacimiento: '1990-01-01',
      descripcion: 'Estudiante de ingeniería'
    }),
    update: (id: number, usuarioData: any) => of({}),
    create: (usuarioData: any) => of({})
  };

  // Mocked ActivatedRoute
  const mockActivatedRoute = {
    snapshot: { paramMap: { get: () => '1' } },
    queryParams: of({ email: 'juanperez@example.com' })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Importamos ReactiveFormsModule para usar formularios reactivos
        RouterTestingModule, // Importamos RouterTestingModule para manejar rutas en las pruebas
        UsuarioFormComponent // Importamos directamente el componente standalone
      ],
      providers: [
        FormBuilder,
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Activamos la detección de cambios inicial
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values when editing an existing user', () => {
    component.ngOnInit(); // Llamamos a ngOnInit para inicializar el formulario
    fixture.detectChanges();

    const form = component.form;
    expect(form?.get('primer_nombre')?.value).toBe('Juan');
    expect(form?.get('segundo_nmbre')?.value).toBe('Carlos');
    expect(form?.get('correo')?.value).toBe('juanperez@example.com');
  });

  it('should save the form data when form is valid and save is called', () => {
    component.form?.get('primer_nombre')?.setValue('Carlos');
    component.form?.get('segundo_nmbre')?.setValue('Miguel');
    component.form?.get('primer_apellido')?.setValue('Garcia');
    component.form?.get('segundo_apellido')?.setValue('Martinez');
    component.form?.get('telefono')?.setValue('987654321');
    
    let saveCalled = false;
    spyOn(mockUsuarioService, 'update').and.callFake(() => {
      saveCalled = true;
      return of({});
    });

    component.save();
    expect(saveCalled).toBeTruthy();
  });

  it('should navigate to the list page after saving', () => {
    component.form?.get('primer_nombre')?.setValue('Carlos');
    component.form?.get('segundo_nmbre')?.setValue('Miguel');
    component.form?.get('primer_apellido')?.setValue('Garcia');
    component.form?.get('segundo_apellido')?.setValue('Martinez');
    component.form?.get('telefono')?.setValue('987654321');

    const navigateSpy = spyOn(component['router'], 'navigate');
    component.save();
    expect(navigateSpy).toHaveBeenCalledWith(['/listarusuario']);
  });

  it('should display "Nuevo contacto" when no user is provided', () => {
    component.usuario = undefined; // No se pasa un usuario
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Nuevo contacto');
  });

  it('should display "Editar" when a user is provided', () => {
    component.usuario = { 
      id_usuario: 1, 
      primer_nombre: 'Juan', 
      segundo_nmbre: 'Carlos', 
      primer_apellido: 'Perez', 
      segundo_apellido: 'Lopez', 
      rol: 'Estudiante', 
      codigotutor: '1234', 
      correo: 'juanperez@example.com', 
      sexo: 'Masculino', 
      telefono: '1234567890', 
      fecha_nacimiento: '1990-01-01', 
      descripcion: 'Estudiante de ingeniería' 
    };
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Editar');
  });
});
