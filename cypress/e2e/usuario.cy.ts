/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'
import { generate } from 'gerador-validador-cpf'

describe('Usuário', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  context('Usuário | Cadastro', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'GET',
        pathname: '/'
      }).as('paginaInicial')

      cy.visit('/')

      cy.wait('@paginaInicial')
    })

    it('cadastrar usuário com sucesso', () => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      const cpf = generate({ format: true })
      const phoneNumber = '(95) 95158-3801'

      const usuario = {
        firstName,
        lastName,
        email: `${firstName}.${lastName}@mail.com`,
        password: 'Abd@1235',
        cpf: cpf.replace('.|-', ''),
        birthDate: faker.date.birthdate().toLocaleDateString('en-GB'),
        phoneNumber: phoneNumber.replace('(|)| |-', '')
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
        cy.wait('@paginaInicial')
        cy.get('body')
          .should('contain.text', `Olá, ${usuario.firstName}!`)
          .click()

        /* cy.visit('/meus-dados/editar')

            Para a página da Natura, não foi possível validar os dados gravados
          uma vez que quando o caminho "/meus-dados/editar" é acessado direto,
          os campos são carregados em branco
            Os campos carregam preenchidos apenas se clicar no menu de edição,
          porém via cypress/css não foi possível localizar um elemento o clicável.
          */
      } else if (Cypress.config('baseUrl') === 'https://www.aesop.com.br/') {
        cy.get('body')
          .should('contain.text', `${usuario.firstName}`)

        cy.visit('/meus-dados/editar')

        cy.get('input[name="firstName"]')
          .should('have.value', usuario.firstName)

        cy.get('input[name="lastName"]')
          .should('have.value', usuario.lastName)

        cy.get('input[name="email"]')
          .should('have.value', usuario.email.toLowerCase())

        cy.get('input[name="cpf"]')
          .should('have.value', cpf)

        cy.get('input[name="dateOfBirth"]')
          .should('have.value', usuario.birthDate)

        cy.get('input[name="homePhone"]')
          .should('have.value', phoneNumber)
      }
    })
  })
})
