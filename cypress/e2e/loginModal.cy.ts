describe("LoginModal", () => {
  beforeEach(() => {
    cy.visit("/"); // Visit your Next.js page that contains the LoginModal component
  });

  it("is revealed when 'Sign In' button in AuthBlock is clicked", () => {
    // Assert that the AuthBlock is visible on the page
    cy.contains("Join Twitter today.").should("be.visible");

    // Click the 'Sign In' button in AuthBlock
    cy.contains("Sign in").click();

    // Assert that the LoginModal is visible
    cy.contains("Login").should("be.visible");

    cy.get('input[data-testid="form-input"][type="email"]').should("exist");
    cy.get('input[data-testid="form-input"][type="password"]').should("exist");

    // You can add additional assertions or tests related to the LoginModal behavior here
  });

  it("logs in successfully with valid credentials", () => {
    // Open the LoginModal
    cy.contains("Sign in").click();

    // Type valid email and password in the input fields
    cy.get('input[data-testid="form-input"][type="email"]').type(
      "test@example.com"
    );
    cy.get('input[data-testid="form-input"][type="password"]').type(
      "password123"
    );

    // Mock the server response for successful login
    cy.intercept("POST", "/api/auth/callback/credentials", {
      statusCode: 200,
      body: {
        user: { email: "test@example.com" },
        credentials: {},
        provider: "credentials",
      },
    });

    // Submit the form
    cy.get("form").submit();

    // Check if the success toast message appears using the custom command
  });

  it("shows an error message with invalid credentials", () => {
    // Open the LoginModal
    cy.contains("Sign in").click();

    // Type invalid email and password in the input fields
    cy.get('input[data-testid="form-input"][type="email"]').type(
      "invalid@example.com"
    );
    cy.get('input[data-testid="form-input"][type="password"]').type(
      "wrongpassword"
    );

    // Mock the server response for invalid login
    cy.intercept("POST", "/api/auth/callback/credentials", {
      statusCode: 401,
      body: { error: "Invalid credentials" },
    });

    // Submit the form
    cy.get("form").submit();
  });
});
