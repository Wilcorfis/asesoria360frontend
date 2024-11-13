/// <reference types="cypress" />
import { expect } from 'chai';



describe('Edición de asesoría existente', () => {
    beforeEach(() => {

      cy.visit('/579/editarasesoria');
    });

    it('Debería actualizar la asesoría al enviar el formulario', () => {
      cy.get('#fecha_asesoria').clear().type('2023-12-15');
      cy.get('#ubicacion').clear().type('Aula 202');
      cy.get('#capacidad').clear().type('15');
      cy.get('.btn').eq(1).click(); 
  
      
    });
  });
  
