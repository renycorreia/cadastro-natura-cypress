Cypress.Commands.add('criarUsuario', usuario => {
  cy.wait(3000)

  cy.get('input[name="firstName"]')
    .type(usuario.firstName)

  cy.get('input[name="lastName"]')
    .type(usuario.lastName)

  cy.get('input[name="email"]')
    .type(usuario.email.toLowerCase())

  cy.get('#password-field')
    .type(usuario.password)

  cy.get('#confirmPassword-field')
    .type(usuario.password)

  cy.get('input[name="cpf"]')
    .type(usuario.cpf)

  cy.get('input[name="dateOfBirth"]')
    .type(usuario.birthDate)

  cy.get('.MuiFormGroup-root')
    .children()
    .eq(Math.floor(Math.random() * 3))
    .click()

  cy.get('input[name="homePhone"]')
    .type(usuario.phoneNumber)

  cy.get('#acceptedterms')
    .check()

  cy.contains('Criar Conta')
    .click()
})
