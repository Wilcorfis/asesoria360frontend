import { ComponentFixture, TestBed } from '@angular/core/testing';
import  UsuarioListComponent  from './usuario-list.component';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { Usuario } from '../model/usuario.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('UsuarioListComponent', () => {
  let component: UsuarioListComponent;
  let fixture: ComponentFixture<UsuarioListComponent>;
  let usuarioServiceMock: any;
  let authServiceMock: any;

  beforeEach(() => {
    // Mocking the services
    usuarioServiceMock = jasmine.createSpyObj('UsuarioService', ['list', 'delete']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['isLoggedIn$', 'getEmail']);

    // Make sure isLoggedIn$ is an observable
    authServiceMock.isLoggedIn$ = of(true);  // or of(false) depending on the test case
    authServiceMock.getEmail = jasmine.createSpy().and.returnValue(of('john.doe@example.com'));

    TestBed.configureTestingModule({
      imports: [UsuarioListComponent, RouterTestingModule, DatePipe],
      providers: [
        { provide: UsuarioService, useValue: usuarioServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ]
    });

    fixture = TestBed.createComponent(UsuarioListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a single user when logged in', () => {
    // Simulamos un único usuario (objeto)
    const mockUsuario: any = { 
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
  
    // Simulamos que el servicio devuelve un array con un solo usuario
    usuarioServiceMock.list.and.returnValue(of(mockUsuario));  // Devuelve un array con un único objeto
  
    // Disparamos la detección de cambios
    fixture.detectChanges(); 
  
    // Verificamos que el componente ha cargado el usuario correctamente
  
    expect(component.usuario).toEqual(jasmine.objectContaining(mockUsuario));  // Uso de jasmine.objectContaining
    expect(usuarioServiceMock.list).toHaveBeenCalledWith('john.doe@example.com');
  });
  
  
  
  


});


