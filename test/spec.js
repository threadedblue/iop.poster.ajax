var PosterSetup = function() {
  this.emailIn = element(by.model('email'));
  this.providerIn = element(by.css('#provider-ddl option:nth-child(2)'));
  this.submitBtn = element(by.id('submit-btn'));
  
  this.get = function() {
    browser.get('http://localhost');
  };

  this.setEmail = function(sEmail) {
    this.emailIn.sendKeys(sEmail);
  };
  this.doNext = function() {
	  this.submitBtn.click();
  };
};

describe('Poster app', function() {
  it('should have a title', function() {
    browser.get('http://localhost');
    console.log("title=" + browser.getTitle());
    expect(browser.getTitle()).toEqual('Poster');
  });
  it('should nav to form', function() {
	  var posterSetup = new PosterSetup();
	  posterSetup.get();

	  posterSetup.setEmail('geoffry.roberts@gmail.com');

	  expect(posterSetup.providerIn.getText()).toEqual('Med Star Washington'); 
	  posterSetup.doNext();
	  expect(element(by.css('#form')).isPresent()).toBeTruthy();
  }); 
});