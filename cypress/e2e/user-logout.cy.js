describe("logout button", () => {
  before(() => {
    // Opens up website and closes register form
    cy.visit(Cypress.env("LOCAL_HOST"));
    cy.wait(2000);
    cy.get('.modal-footer > [data-bs-dismiss="modal"]').eq(1).click();

    // Opens up login form
    cy.get('.text-end > [data-bs-target="#loginModal"]').click();
    cy.wait(2000);
  });

  it("can logout the user when clicking on it", () => {
    // Adds and checks login input credentials
    cy.get("#loginEmail").type(Cypress.env("USER_EMAIL"));
    cy.get("#loginPassword").type(Cypress.env("USER_PASSWORD"));
    cy.get("#loginForm > .modal-footer").find("button.btn-success").click();

    // Checks that the login credentials are valid
    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "userAuth"
    );

    cy.wait(2000);
    cy.get('.text-end > [data-auth="logout"]').click();

    // Checks that localStorage containing the token is empty
    cy.window()
      .its("localStorage")
      .then((localStorage) => {
        expect(Object.keys(localStorage)).to.be.empty;
      });

    // Check that the current URL is the base starter url where you login
    cy.url().should("eq", Cypress.config("baseUrl") + "/");
  });
});
