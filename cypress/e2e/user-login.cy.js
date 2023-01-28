describe("login feature", () => {
  before(() => {
    // Opens up website and closes register form
    cy.visit(Cypress.env("LOCAL_HOST"));
    cy.wait(2000);
    cy.get('.modal-footer > [data-bs-dismiss="modal"]').eq(1).click();

    // Opens up login form
    cy.get('.text-end > [data-bs-target="#loginModal"]').click();
    cy.wait(2000);
  });

  it("can login if the user submits valid credentials", () => {
    // Adds and checks login input credentials
    cy.get("#loginEmail")
      .type(Cypress.env("USER_EMAIL"))
      .should("have.value", Cypress.env("USER_EMAIL"), { force: true });
    cy.get("#loginPassword")
      .type(Cypress.env("USER_PASSWORD"))
      .should("have.value", Cypress.env("USER_PASSWORD"));
    cy.get("#loginForm > .modal-footer").find("button.btn-success").click();

    // Checks that the login credentials are valid
    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "userAuth"
    );
    cy.wait("@userAuth").then((userAuthResult) => {
      expect(userAuthResult.response.statusCode).to.equal(200);
    });

    // Checks that localStorage has user Token Uploaded

    cy.wait(2000);

    cy.window().its("localStorage.getItem").should("exist", "token");
    cy.window()
      .its("localStorage")
      .then((localStorage) => {
        const token = localStorage.getItem("token");
        expect(token).to.be.a("string").and.not.empty;
      });
  });
});
