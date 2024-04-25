/// <reference types="cypress" />

const number = Math.floor(Math.random() * 1000);
const emailRegister = `teste${number}@teste.com`;

describe("Test Dashboard Page", () => {
  it("Register user to login in", () => {
    cy.visit("/register");
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();
    cy.get("button.swal2-confirm").click();

    cy.visit("/login");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-primary").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard");
    });
  });
});
