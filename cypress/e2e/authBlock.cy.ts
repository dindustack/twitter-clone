// cypress/integration/authBlock.spec.ts
describe("AuthBlock", () => {
  beforeEach(() => {
    cy.visit("/"); // Visit your Next.js home page that contains the AuthBlock component
  });

  it("opens the registration modal when 'Create an account' button is clicked", () => {
    // Click the 'Create an account' button
    cy.contains("Create an account").click();

    // Assert that the registration modal is visible
    cy.contains("Register").should("be.visible");
  });

  it("opens the login modal when 'Sign in' link is clicked", () => {
    // Click the 'Sign in' link
    cy.contains("Sign in").click();

    // Assert that the login modal is visible
    cy.contains("Login").should("be.visible");
  });
});
