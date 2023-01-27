describe("My first test", () => {
  it("find the content 'test'", () => {
    cy.visit("/");
    cy.wait(2000);

    // Find register close button and close it
    cy.get('.modal-footer > [data-bs-dismiss="modal"]').eq(1).click();
    cy.get('.text-end > [data-bs-target="#loginModal"]').click();
    cy.wait(2000);
    cy.get("#loginEmail")
      .type(Cypress.env("API_EMAIL"))
      .should("have.value", Cypress.env("API_EMAIL"), { force: true });
    cy.get("#loginPassword").type(Cypress.env("API_PASSWORD"));
    cy.get("#loginForm > .modal-footer").find("button.btn-success").click();
  });
});
