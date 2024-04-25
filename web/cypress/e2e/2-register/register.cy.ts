/// <reference types="cypress" />

describe("Test Register Page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("verify if have input name, email, password and button", () => {
    cy.get("input[type='text']");
    cy.get("input[type='email']");
    cy.get("input[type='password']");
    cy.get("button.v-btn.bg-primary");
  });

  it("verify if have link to login", () => {
    cy.get("a[href='/']");
  });

  it("test register with success", () => {
    const number = Math.floor(Math.random() * 1000);
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(`teste${number}@teste.com`);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();

    cy.get("div.swal2-html-container").should(
      "have.text",
      "Cadastro realizado com sucesso!"
    );

    cy.get("button.swal2-confirm").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/login");
    });
  });

  it("test register with email already exists", () => {
    const number = Math.floor(Math.random() * 1000);
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(`teste${number}@teste.com`);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();

    cy.get("button.swal2-confirm").click();

    cy.visit("/register");
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(`teste${number}@teste.com`);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();

    cy.get("div.swal2-html-container").should("have.text", "Usuário já existe");
  });
});
