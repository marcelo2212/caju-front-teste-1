describe('Testes do Dashboard', () => {
    beforeEach(() => {
      cy.visit('/dashboard');
    });
  
    it('deve exibir todos os registros', () => {
      cy.get('.registration-card').should('have.length.at.least', 1);
    });
  
    it('deve filtrar por CPF', () => {
      const cpf = '12345678901';
      cy.get('input[placeholder="Digite um CPF válido"]').type(cpf);
      cy.get('.registration-card').each(($card) => {
        cy.wrap($card).contains(cpf);
      });
    });
  
    it('deve atualizar o status para APROVADO', () => {
      cy.get('.registration-card').first().within(() => {
        cy.contains('Aprovar').click();
      });
      cy.contains('Deseja mudar o status').should('be.visible');
      cy.contains('Sim').click();
      cy.get('.registration-card').first().should('contain', 'APROVADO');
    });
  
    it('deve deletar um registro', () => {
      cy.get('.registration-card').first().within(() => {
        cy.get('[aria-label="delete"]').click();
      });
      cy.contains('Deseja realmente excluir').should('be.visible');
      cy.contains('Sim').click();
      cy.get('.registration-card').should('have.length.lessThan', 1);
    });
  
    it('deve atualizar os registros ao clicar no botão de refresh', () => {
      cy.get('[aria-label="refetch"]').click();
      cy.get('.registration-card').should('have.length.at.least', 1);
    });
  });
  