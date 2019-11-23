import App from '../support/index.js';

describe('Login Page UI Elements Test', function(){
   const app = new App();

  before(() => {
    app.goTo("https://demo.applitools.com/hackathon.html");
  })

  it('displays logo', function(){
    app.isVisible('.logo-w > a > img');
  });

  it('has title', function(){
    app.isElementTextEquals('.auth-header', 'Login Form')
  });

  it('displays input fields', function(){
    app.isVisible('#username');
    app.isVisible('#password');
  });

  it('has input labels', function(){
    app.isElementTextEquals(':nth-child(1) > label', 'Username');
    app.isElementTextEquals('form > :nth-child(2) > label', 'Password');
  });

  it('input fields have placeholders', function(){
    app.isPlaceholderEquals('#username', 'Enter your username');
    app.isPlaceholderEquals('#password', 'Enter your password');
  });

  it('displays login button', function(){
    app.isVisible('#log-in');
  });

  it('displays Remember Me checkbox', function(){
    app.isVisible('.form-check-input');cy.get('.form-check-input').should('exist');
    app.isElementTextEquals('.form-check-label', 'Remember Me');
  });

  it('displays social login icons', function(){
    app.isVisible('img[src*="twitter"]');
    app.isVisible('img[src*="facebook"]');
    app.isVisible('img[src*="linkedin"]');
  });

})
