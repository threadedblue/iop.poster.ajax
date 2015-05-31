var PosterSetup = function() {
  this.emailIn = element(by.model('poster.email'));
  this.firsNameIn = element(by.model('poster.firstName'));
  this.lastNameIn = element(by.model('poster.lastName'));
  this.descIn = element(by.model('poster.desc'));
  this.fromIn = element(by.model('poster.from'));
  this.toIn = element(by.model('poster.to'));
  this.descIn = element(by.model('poster.desc'));
  this.belovedIn0 = element(by.model('poster.beloved'));
  this.belovedIn1 = element(by.model('poster.beloved'));
  this.likesIn0 = element(by.model('poster.likes'));
  this.likesIn1 = element(by.model('poster.likes'));
  this.submitBtn = element(by.id('submit-btn'));
  
  this.get = function() {
    browser.get('http://localhost');
  };

  this.setEmail = function(s) {
    this.emailIn.sendKeys(s);
  };
  this.setfirsName = function(s) {
	    this.firsNameIn.sendKeys(s);
  };
  this.setlastName = function(s) {
	    this.lastNameIn.sendKeys(s);
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

	  posterSetup.setEmail('threadedblue@gmail.com');
	  posterSetup.setFirstName('threaded');
	  posterSetup.setLastName('blue');

	  expect(posterSetup.providerIn.getText()).toEqual('Med Star Washington'); 
	  posterSetup.doNext();
	  expect(element(by.css('#form')).isPresent()).toBeTruthy();
  }); 
});