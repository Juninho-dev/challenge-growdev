/// <reference types="cypress" />

const number = Math.floor(Math.random() * 1000);
const emailRegister = `teste${number}@teste.com`;

describe("Test Dashboard Page", () => {
  it("Register user to login in", () => {
    cy.visit("/register");
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();
    cy.get("button.swal2-confirm").click();

    cy.visit("/login");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students");
    });
  });

  it("Register user to login in and go to create student", () => {
    cy.visit("/register");
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();
    cy.get("button.swal2-confirm").click();

    cy.visit("/login");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students");
    });

    cy.get("div.v-navigation-drawer__scrim").click();
    cy.get("button.v-btn.bg-orange").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students/create");
    });
  });

  it("Register user to login in and go to create student and create", () => {
    cy.visit("/register");
    cy.get("input[type='text']").type("teste");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();
    cy.get("button.swal2-confirm").click();

    cy.visit("/login");
    cy.get("input[type='email']").type(emailRegister);
    cy.get("input[type='password']").type("password");
    cy.get("button.v-btn.bg-orange").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students");
    });

    cy.get("div.v-navigation-drawer__scrim").click();
    cy.get("button.v-btn.bg-orange").click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students/create");
    });

    cy.get("input[id=name]").type("teste");
    cy.get("input[id=email]").type(`teste${Math.random()}@teste.com`);
    cy.get("input[id=ra]").type(Math.floor(Math.random() * 100000).toString());
    cy.get("input[id=cpf]").type(Math.floor(Math.random() * 100000000000).toString());

    cy.get("button.v-btn.bg-orange").click();

    cy.get("h2[id=swal2-title]").should("have.text", "Aluno cadastrado com sucesso");
    cy.location().should((location) => {
      expect(location.pathname).to.eq("/dashboard/students");
    });
  });
});
