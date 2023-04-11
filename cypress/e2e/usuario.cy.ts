/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Usuário | Cadastro', {
  /* retries: {
        runMode: 3,
        openMode: 1
      } */
}, () => {
  context('Usuário | Cadastro', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('cadastrar usuário com sucesso', () => {

    const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()

      const usuario = {
        firstName: firstName,
        lastName: lastName,
        email: `${firstName}.${lastName}@mail.com`,
        password: 'Abd@1235',
        cpf: generate(),
        birthDate: faker.date.birthdate().toLocaleDateString('en-GB'),
        phoneNumber: '95951583801'
      }

      cy.get('.MuiBox-root > .MuiTypography-subtitle2')
      .click()
      
      cy.criarUsuario(usuario)

      cy.get('h6')
        .should('contain.text', `Olá, ${usuario.firstName}!`)
    })
  })
})
