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

class App{

  goTo(url){
    cy.visit(url);
  }

  isVisible(selector){
    cy.get(selector).should('be.visible');
  }

  isElementTextEquals(selector, text){
    cy.get(selector).should((elem) => {
      expect(elem.text().trim().replace(TO_REPLACE,"")).to.equal(text);
    });
  }

  isPlaceholderEquals(selector, text){
    cy.get(selector).should('have.attr', 'placeholder', text);
  }

  sendKeys(selector, text){
    cy.get(selector).clear().type(text);
  }

  clickOn(selector){
    cy.get(selector).click();
  }

  isUrlEquals(url){
    cy.url().should('eq', url);
  }

}

export default App;
