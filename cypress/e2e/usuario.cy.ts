/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Usuário', {
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
        firstName,
        lastName,
        email: `${firstName}.${lastName}@mail.com`,
        password: 'Abd@1235',
        cpf: generate(),
        birthDate: faker.date.birthdate().toLocaleDateString('en-GB'),
        phoneNumber: '95951583801'
      }

      if (Cypress.config('baseUrl') === 'https://www.natura.com.br/') {
        cy.get('.MuiBox-root > .MuiTypography-subtitle2')
          .click()
        cy.get('.MuiButton-outlined > .MuiButton-label')
          .click()
      } else if (Cypress.config('baseUrl') === 'https://www.aesop.com.br/') {
        cy.get('a')
          .each(($elm) => {
            cy.wrap($elm)
              .invoke('attr', 'href')
              .then(href => {
                if (href === '/cadastre-se') {
                  cy.wrap($elm).click()
                }
              })
          })
      }

      cy.criarUsuario(usuario)

      if (Cypress.config('baseUrl') === 'https://www.natura.com.br/') {
        cy.get('body')
          .should('contain.text', `Olá, ${usuario.firstName}!`)
          .click()
      } else if (Cypress.config('baseUrl') === 'https://www.aesop.com.br/') {
        cy.get('body')
          .should('contain.text', `${usuario.firstName}`)
      }
    })
  })
})
