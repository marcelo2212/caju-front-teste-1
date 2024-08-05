describe('Testes do Formulário', () => {
    beforeEach(() => {
      cy.visit('/form');
    });
  
    it('deve validar e submeter o formulário', () => {
      cy.get('input[name="employeeName"]').type('João Silva');
      cy.get('input[name="email"]').type('joao.silva@example.com');
      cy.get('input[name="cpf"]').type('123.456.789-01');
      cy.get('input[name="admissionDate"]').type('2022-01-01');
      cy.contains('Cadastrar').click();
      cy.url().should('include', '/dashboard');
      cy.get('.notification-success').should('be.visible');
    });
  
    it('deve mostrar erro de validação para email inválido', () => {
      cy.get('input[name="email"]').type('joao.silva@com');
      cy.contains('Cadastrar').click();
      cy.contains('Email inválido.').should('be.visible');
    });
  
    it('deve mostrar erro de validação para CPF inválido', () => {
      cy.get('input[name="cpf"]').type('123.456.789-00');
      cy.contains('Cadastrar').click();
      cy.contains('CPF inválido.').should('be.visible');
    });
  
    it('deve mostrar erro se o CPF já estiver cadastrado', () => {
      cy.get('input[name="cpf"]').type('123.456.789-01');
      cy.contains('Cadastrar').click();
      cy.contains('O registro digitado já foi cadastrado.').should('be.visible');
    });
  });
  