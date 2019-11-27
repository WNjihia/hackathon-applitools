import App from '../support/index.js';

/** 
Open the login page and write assertions to ensure everything looks OK on that page. 
i.e. add assertions to ensure all the fields, labels and all other items exist.
**/

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

/** 
Test the following login functionality by entering different values to username and password fields:
- If you don’t enter the username and password and click the login button, it should throw an error
- If you only enter the username and click the login button, it should throw an error
- If you only enter the password and click the login button, it should throw an error
- If you enter both username (any value) and password (any value), it should log you in.
**/

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

/** 
 Once logged in (use any username and password to login), view the Recent Transactions table. 
 Your test should click on the "Amounts" header, and verify that the column is in ascending order 
 and that each row’s data stayed in tact after the sorting.
**/

describe('Table Sort Test', function(){
  const app = new App();
  const val = "test";

  before(() => {
    app.goTo("https://demo.applitools.com/hackathon.html");
    app.sendKeys('#username', val);
    app.sendKeys('#password', val);
    app.clickOn('#log-in');
  });

  it('sorts in ascending order when Amounts header is clicked', async function(){
    const initial = await app.getAmounts(true);
    app.clickOn('#amount');
    const current = await app.getAmounts();
    expect(initial).to.deep.equal(current);
  });
});

/** 
Once logged in, click on the "Compare Expenses" button on the toolbar. 
This will display a bar chart comparing the expenses for the year 2017 and 2018. 
Assume the values of the chart are coming from a test data and the test data will not change across versions.
Validate that the bar chart and representing that data (number of bars and their heights).
They should remain the same across versions. Then click on the "Show data for next year" button.
This should add the data for the year 2019. Verify that this data set is added for the year 2019.
**/

describe("Canvas Chart Test", function(){
  const app = new App();
  const val = "test";

  before(() => {
    app.goTo("https://demo.applitools.com/hackathon.html");
    app.sendKeys('#username', val);
    app.sendKeys('#password', val);
    app.clickOn('#log-in');
  });

  it("bar chart remains the same across different versions", function(){
    cy.get("#showExpensesChart");
    app.isUrlEquals('https://demo.applitools.com/hackathonChart.html');
    //This is a visual test which is very hard to do with Cypress without using Applitools 
  });

  it("shows data for year 2019 is added when show data for next year button is clicked", function(){
    //This is a visual test which is very hard to do with Cypress without using Applitools 
  });
});

/** 
Test for the existence of a display ad that’s dynamic and at times might go missing by using this URL: 
https://demo.applitools.com/hackathon.html?showAd=true. 
Log in by entering any username and password. 
Once logged in, you should see two different "Flash sale" gifs. 
Make sure both gifs exists.
**/

describe("Dynamic Content Test", function(){
  const app = new App();
  const val = "test";

  before(() => {
    app.goTo("https://demo.applitools.com/hackathon.html?showAd=true");
    app.sendKeys('#username', val);
    app.sendKeys('#password', val);
    app.clickOn('#log-in');
  });

  it.only("shows two different flash sale gifs", function(){
    app.isVisible("#flashSale > img");
    app.isVisible("#flashSale2 > img");
  });
});
