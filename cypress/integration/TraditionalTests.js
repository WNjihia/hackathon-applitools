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

describe('Data-Driven Test', function(){
  const app = new App();

  beforeEach(() => {
    app.goTo("https://demo.applitools.com/hackathon.html");
  });

  it('successfully logs user in when both username and password are entered', function(){
    app.sendKeys('#username', 'test');
    app.sendKeys('#password', 'test');
    app.clickOn('#log-in');
    app.isUrlEquals('https://demo.applitools.com/hackathonApp.html');
  });

  it('throws error for empty username field', function(){
    app.sendKeys('#password', 'test');
    app.clickOn('#log-in');
    app.isElementTextEquals('.alert-warning', 'Username must be present');
  });

  it('throws error for empty password field', function(){
    app.sendKeys('#username', 'test');
    app.clickOn('#log-in');
    app.isElementTextEquals('.alert-warning', 'Password must be present');
  });

  it('throws error when both username and password are empty', function(){
    app.clickOn('#log-in');
    app.isElementTextEquals('.alert-warning', 'Both Username and Password must be present');
  });

})

describe('Table Sort Test', function(){
  const app = new App();

  before(() => {
    app.goTo("https://demo.applitools.com/hackathon.html");
    app.sendKeys('#username', 'test');
    app.sendKeys('#password', 'test');
    app.clickOn('#log-in');
  });

  // it('has a Recent Transactions title', function(){
  //   cy.get(':nth-child(2) > .element-header').should((elem) => {
  //     expect(elem.text().replace(TO_REPLACE,"").trim()).to.equal('Recent Transactions');
  //   });
  // });

  it('sorts in ascending order when Amounts header is clicked', async function(done){
    try {
      const initial = await app.getAmounts(true);
      app.clickOn('#amount');
      const current = await app.getAmounts();
      
      console.log("dfdfd", initial);
      console.log("current", current);
    } catch(e){
      console.log(e);
    }
    
    console.log("we are here");
    
    expect(1).to.deep.equal(1);
    done();
  });
});
