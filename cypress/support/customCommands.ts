declare namespace Cypress {
  interface Chainable {
    criarUsuario: (usuario: any) => Chainable<any>
  }
}
