/// <reference types="cypress" />

  it('should render the form with all fields', () => {
    cy.get('form').should('exist'); // Asegurarse de que el formulario existe
    cy.get('select#horario').should('exist'); // Selección de horario
    cy.get('select#asignatura').should('exist'); // Selección de asignatura
    cy.get('input#fecha_asesoria').should('exist'); // Campo de fecha
    cy.get('input#ubicacion').should('exist'); // Campo de ubicación
    cy.get('select#visibilidad').should('exist'); // Selección de visibilidad
    cy.get('input#capacidad').should('exist'); // Campo de capacidad
  });
  /*it('should render the buttons correctly', () => {
    cy.get('button').contains('Cancelar').should('exist'); // Botón de cancelar
    cy.get('button').contains('Crear asesoria').should('exist'); // Botón de crear asesoria
    
    // Si estamos editando, el texto debe cambiar a "Actualizar asesoria"
    cy.window().then((win) => {
      win.asesoria = { };
    });
    
    cy.visit('/nuevoasesoria'); // Recargar para aplicar los cambios
  
    cy.get('button').contains('Actualizar asesoria').should('exist'); // Verificar que el texto cambia a "Actualizar asesoria"
  });*/
  it('should navigate correctly when "Cancelar" button is clicked', () => {
    cy.get('button').contains('Cancelar').click(); // Clic en el botón de cancelar
    cy.url().should('include', '/listarasesoria'); // Verificar que redirige a /listarasesoria
  });
  
  it('should submit the form when "Crear asesoria" button is clicked', () => {
    // Simulamos un formulario válido
    cy.get('input#ubicacion').type('Salon A');
    cy.get('input#capacidad').type('30');
    cy.get('select#horario').select('1'); // Seleccionar un horario
    cy.get('select#asignatura').select('1'); // Seleccionar una asignatura
    cy.get('input#fecha_asesoria').type('2024-11-10'); // Fecha de la asesoria
    cy.get('select#visibilidad').select('publico'); // Seleccionar visibilidad
  
    // Clic en el botón de Crear asesoria
    cy.get('button').contains('Crear asesoria').click();
  
    // Verificar que el formulario fue enviado correctamente
    cy.get('form').then(($form) => {
      // Asumiendo que la propiedad `valid` está disponible en el formulario,
      // se podría acceder de la siguiente manera:
      const formValid = $form[0].checkValidity(); // Verifica si el formulario es válido
      expect(formValid).toBeTruthy(); // Verifica que el formulario sea válido
    });
  });
  
  beforeEach(() => {
    cy.window().then((win) => {
      win.asesoria = { 
        id_asesoria: 1, 
        asignatura: 'Matemáticas', 
        horario: '9:00 - 10:00', 
        fecha_asesoria: '2024-11-10',
        ubicacion: 'Salon 1', 
        visibilidad: 'publico', 
        capacidad: 25
      };
    });
    cy.visit('/nuevoasesoria');
  });
  
  
  
  