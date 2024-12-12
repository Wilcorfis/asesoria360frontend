import { ComponentFixture, TestBed } from '@angular/core/testing';
import AsesoriaListComponent from './asesoria-list.component';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { AsesoriaService } from '../services/asesoria.service';
import { SuscripcionasesoriaService } from '../services/suscripcionasesoria.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AsesoriaListComponent', () => {
  let component: AsesoriaListComponent;
  let fixture: ComponentFixture<AsesoriaListComponent>;

  const mockAuthService = {
    isLoggedIn$: of(true)
  };

  const mockUsuarioService = {
    getUsuario: () => of({ id_usuario: 1, nombre: 'Test User', rol: 'Estudiante' })
  };

  const mockAsesoriaService = {
    list: () => of([{ id_asesoria: 1, horario: { hora_inicio: '08:00', hora_fin: '10:00' }, tutor: { primer_nombre: 'Juan', primer_apellido: 'Perez' }, asignatura: { nombre: 'Matemáticas' }, fecha_creacion: '2023-11-10', fecha_asesoria: '2023-11-15', ubicacion: 'Aula 101', estado: 'creada', visibilidad: 'publico', capacidad: 10 }]),
    delete: (id: number) => of({})
  };

  const mockSuscripcionService = {
    getbyidusuario: (idUsuario: number) => of({ id_suscripcion: 1, asesoria: { id_asesoria: 1 } })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AsesoriaListComponent,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsuarioService, useValue: mockUsuarioService },
        { provide: AsesoriaService, useValue: mockAsesoriaService },
        { provide: SuscripcionasesoriaService, useValue: mockSuscripcionService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsesoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load asesorias on initialization', () => {
    component.ngOnInit();
    expect(component.asesoria.length).toBeGreaterThan(0);
    expect(component.asesoria[0].id_asesoria).toBe(1);
  });

  it('should display the list of asesorias', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.asesoria.length);
  });

  it('should load suscripcion data based on usuario id', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.suscripcion).toBeTruthy();
   
  });

  it('should call asesoriaService.delete when deleteasesoria is called', () => {
    spyOn(mockAsesoriaService, 'delete').and.callThrough();
    component.deleteasesoria(component.asesoria[0]);
    expect(mockAsesoriaService.delete).toHaveBeenCalledWith(1);
  });

  it('should reload the asesorias list after deletion', () => {
    spyOn(component, 'loadAll').and.callThrough();
    component.deleteasesoria(component.asesoria[0]);
    expect(component.loadAll).toHaveBeenCalled();
  });
/*
  it('should display "Inscribirme" button for a public asesoria if the user is not subscribed', () => {
    component.suscripcion = null; // Simula que el usuario no está inscrito
    fixture.detectChanges();
    const inscribirButton = fixture.debugElement.query(By.css('.btn-primary'));
    expect(inscribirButton.nativeElement.textContent).toContain('Inscribirme');
  });

  it('should display "Ya esta inscrito" if the user is already subscribed', () => {
    component.suscripcion = { asesoria: { id_asesoria: 1 } };
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('td.text-end div'));
    expect(text.nativeElement.textContent).toContain('Ya esta inscrito');
  });
  */
});
