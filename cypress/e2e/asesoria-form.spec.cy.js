/// <reference types="cypress" />
import { expect } from 'chai';
import { Asesoria } from 'src/app/model/asesoria.interface';


describe('AsesoriaFormComponent Integration Tests', () => {
  let asesoriaId=null; 
  
 
  it('should create a new asesoria', () => {
    cy.visit('/nuevoasesoria'); 
    cy.get('#horario').select('1');
    cy.get('#asignatura').select('1');
    cy.get('#fecha_asesoria').type('2023-12-01');
    cy.get('#ubicacion').type('Aula 101');
    cy.get('#visibilidad').select('publico'); 
    cy.get('#capacidad').type('10');
    cy.get('.btn.btn-light.ms-2').click();

    // Asegúrate de completar el objeto con datos de prueba, incluyendo id_usuario
    cy.request('POST', 'https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias', {
      horario: {id_horario:1},
      tutor: {id_usuario:302},
      asignatura: {id_asignatura:1},
      fecha_creacion: new Date().toISOString().split('T')[0],
      fecha_asesoria: '2023-12-01',
      ubicacion: 'Aula 101',
      estado:'creada',
      visibilidad: 'publico',
      capacidad: 10
     
    }).then((response) => {
      
      asesoriaId = response.body.id_asesoria;
      expect(response.status).to.eq(200);

    });
    cy.wait(1000);
  });

  
  
  it('should delete the created asesoria', () => {
    expect(asesoriaId).to.exist;
    cy.request('DELETE', `https://new-christen-wilcorfis-23727a02.koyeb.app/asesorias/${asesoriaId}`).then((response) => {
      expect(response.status).to.eq(200);
    });

    asesoriaId = 0; 
  });
});
 



