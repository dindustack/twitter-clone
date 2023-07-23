// cypress/integration/sidebar.spec.ts
describe("Sidebar", () => {
  beforeEach(() => {
    // Set viewport size to match "lg" breakpoint (adjust width and height as needed)
    cy.viewport(1024, 768);
    // Mock the useSession hook to return null for currentUser
    cy.intercept("GET", "/api/auth/session", {
      statusCode: 200,
      body: { data: null },
    });
    cy.visit("/"); // Visit your Next.js page containing the Sidebar component
  });

  it("displays LoginModal when sidebar items with auth: true are clicked", () => {
    // Find the sidebar items with auth: true and click each of them
    cy.get('[data-testid="sidebar-item-auth"]').each(($item, index: number) => {
      // Scroll the element into view before clicking
      cy.wrap($item).scrollIntoView().click({ force: true, multiple: true });
    });

    cy.contains("Login").should("be.visible");
  });

  // You can add more tests for other Sidebar functionality as needed
});
