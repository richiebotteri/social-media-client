describe("login feature", () => {
  before(() => {
    // Opens up website and closes register form
    cy.visit("/");
    cy.wait(2000);
    cy.get('.modal-footer > [data-bs-dismiss="modal"]').eq(1).click();

    // Opens up login form
    cy.get('.text-end > [data-bs-target="#loginModal"]').click();
    cy.wait(2000);
  });

  it("shows invalid email or password when user submits un-valid credentials", () => {
    // Adds and checks login input credentials
    cy.get("#loginEmail").type("wrongEmail@stud.noroff.no");
    cy.get("#loginPassword").type("wrongPassword");
    cy.get("#loginForm > .modal-footer").find("button.btn-success").click();

    // Checks the api response
    cy.intercept("https://nf-api.onrender.com/api/v1/social/auth/login").as(
      "userAuth"
    );
    cy.wait("@userAuth").then((userAuthResult) => {
      expect(userAuthResult.response.body.statusCode).to.equal(401);
      expect(userAuthResult.response.body.errors[0].message).to.equal(
        "Invalid email or password"
      );
    });
  });
});
