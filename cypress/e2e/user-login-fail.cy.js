describe("login form", () => {
  before(() => {
    // Opens up website and closes register form
    cy.visit(Cypress.env("LOCAL_HOST"));
    cy.wait(2000);
    cy.get('.modal-footer > [data-bs-dismiss="modal"]').eq(1).click();

    // Opens up login form
    cy.get('.text-end > [data-bs-target="#loginModal"]').click();
    cy.wait(2000);
  });

  it("cant submit and gets shown a message if user email is invalid.", () => {
    // Adds login input credentials
    cy.get("#loginEmail").type("test@invalidemail.com");
    cy.get("#loginPassword").type("%%%");
    cy.get("#loginForm > .modal-footer > [type='submit']").click();

    // Catches that validation message gets shown when email is types wrong.
    cy.get("#loginEmail").then(($input) => {
      expect($input[0].validationMessage).to.eq(
        "Sørg for samsvar med det forespurte formatet."
      );
      expect($input[0].validity.valid).to.eq(false);
    });

    cy.get("#loginEmail").clear().type(Cypress.env("USER_EMAIL"));

    cy.get("#loginForm > .modal-footer > [type='submit']").click();

    // Checks that the password is less than 8 being the minimum length.
    cy.get("#loginPassword").then(($input) => {
      expect($input[0].value.length).to.be.lessThan(8);
    });

    // Checks that the login credentials are valid
    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "userAuth"
    );

    // Catching alert function and expecting a message when credentials are wrong.
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Either your username was not found or your password is incorrect"
      );
    });
  });
});
