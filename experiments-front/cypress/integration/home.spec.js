describe('Home Experiments', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    // Se comprueba el renderizado del home
    it('Puede ser abierta', () => {
        // Comprueba si encuentras el siguiente texto
        cy.contains('MUSS - Model Understandability Survey System');
    });

    // Se comprueba el correcto acceso a los experimentos
    it('Se puede acceder a los experimentos', () => {
        // Visita la página home
        cy.visit('http://localhost:3000/');

        // Haz click en el boton de administrar
        cy.contains('Administrar Experimentos').click();
    });
});
