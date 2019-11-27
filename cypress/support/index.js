// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


const TO_REPLACE = /[.,\/#!$%\^&\*;:{}\+=\-_`~()]/g;

class App {

  goTo(url) {
    cy.visit(url);
  }

  isVisible(selector) {
    cy.get(selector).should('be.visible');
  }

  isElementTextEquals(selector, text) {
    cy.get(selector).should((elem) => {
      expect(elem.text().trim().replace(TO_REPLACE, "")).to.equal(text);
    });
  }

  isPlaceholderEquals(selector, text) {
    cy.get(selector).should('have.attr', 'placeholder', text);
  }

  sendKeys(selector, text) {
    cy.get(selector).clear().type(text);
  }

  clickOn(selector) {
    cy.get(selector).click();
  }

  isUrlEquals(url) {
    cy.url().should('eq', url);
  }

  getAmounts(sort) {

    // let sortedDescriptions = [];
    return new Promise((resolve, reject) => {
      const amounts = [];
      // let sortedAmounts = [];
      const description = [];

      cy.get('tbody td.text-right')
        .each((line, index, $list) => {
          try {
            const len = $list.length - 1;
            let num = (line.text().split(' USD')[0]).replace(/[ ,]/g, "");
            let desc = line.parent().find('.cell-with-media').text().replace(/[ \n]/g, "").trim();

            amounts.push({amount: Number(num), description: desc});

            if (sort){
              amounts.sort((a, b) => a.amount - b.amount)
            }
            if (index === len) {
              resolve({amounts});
            }
          } catch (error) {
            reject(error)
          }
      
        });
    });
  }

}

export default App;
