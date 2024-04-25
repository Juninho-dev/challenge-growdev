/// <reference types="cypress" />

describe("Test Login Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("verify if have input email and input password and button", () => {
    cy.get("input[type='email']");
    cy.get("input[type='password']");
    cy.get("button.v-btn.bg-primary");
  });

  it("verify if have link to register", () => {
    cy.get("a[href='/register']");
  });

  it("test login with invalid email", () => {
    cy.get("input[type='email']").type("teste");
    cy.get("input[type='password']").type("123456");
    cy.get("button.v-btn.bg-primary").click();
    cy.get("div.swal2-html-container").should(
      "have.text",
      "Email é obrigatório"
    );
  });

  it("test login with invalid password", () => {
    cy.get("input[type='email']").type("teste@teste.com");
    cy.get("input[type='password']").type("123");
    cy.get("button.v-btn.bg-primary").click();
    cy.get("div.swal2-html-container").should("have.text", "Senha incorreta");
  });

  it("test login with success", () => {
    cy.get("input[type='email']").type("teste@teste.com");
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard");
    });
  });
});
