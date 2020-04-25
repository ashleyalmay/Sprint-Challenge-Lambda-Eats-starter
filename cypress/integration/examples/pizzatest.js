describe('user-boarding', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/pizza')
    })
    it('can submit', () => {
        cy.get('input[name="name"]')
        .type('Raymond')
        .should('have.value', 'Raymond')

        cy.get('input[name="topping1"]')
        .check()
        .should('have.checked')

        cy.get('input[name="topping2"]')
        .check()
        .should('have.checked')

        cy.get('input[name="topping3"]')
        .check()
        .should('have.checked')

        cy.get('input[name="topping4"]')
        .check()
        .should('have.checked')

        cy.get('textarea')
        .type('N/A')
        .should('have.value', 'N/A')

        cy.get('button')
        .click()
    })
    it('has validation error if username has 2 chars', () =>{
        cy.get('input')
        .should((valid) => {
            expect(valid).to.have.length
        })
        
      })
})