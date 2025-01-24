describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');

    cy.contains('Hi, my name is');
    cy.get('h1').contains('Mauricio Gallego');
    cy.get('a')
      .contains('Sysgarage.')
      .should('have.attr', 'href', 'https://sysgarage.com/');

    cy.get('canvas').should('exist');
  });
});
