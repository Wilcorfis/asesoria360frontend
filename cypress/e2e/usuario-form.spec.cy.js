describe('Pruebas de integración para UsuarioFormComponent', () => {
    beforeEach(() => {
      cy.visit('/nuevousuario'); // Ajusta la ruta a la que se debe dirigir el navegador
    });
  
   
  
    it('Muestra validaciones en los campos obligatorios', () => {
      cy.get('#primer_nombre').clear();
      cy.get('#primer_apellido').clear();
      cy.get('button.btn.ms-2').click(); // Ajusta según las clases del botón

  
      cy.get('#primer_nombre').should('have.class', 'ng-invalid');
      cy.get('#primer_apellido').should('have.class', 'ng-invalid');
    });
  });
  