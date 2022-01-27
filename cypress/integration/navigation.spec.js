describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
  // it("should book an interview", () => {
  //   cy.visit("/");

  //   cy.get("appointment__add-button").click();
  // });
});
