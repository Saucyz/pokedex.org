const selenium = require('selenium-webdriver');
const fs = require('fs');
const expect = require('chai').expect;
const http = require('http');
const MainPage = require('./main-page');
const DetailsPanel = require('./details-panel');

const driver = new selenium.Builder()
    .forBrowser('chrome')
    .build();

// Page Objects
const page = new MainPage(driver);
const detailsPanel = new DetailsPanel(driver);

describe('pokedex.org', function () {
  this.timeout(10000);

  before(function () {
    // Open the app page. This assumes the server has already been started
    driver.get('localhost:9000');
  });

  after(function (done) {
    // POST coverage info after all tests are done executing
    driver.switchTo().defaultContent();
    driver.executeScript('return window.__coverage__;').then(function (obj) {
      const str = JSON.stringify(obj);
      const options = {
        port: 8888,
        host: 'localhost',
        path: '/coverage/client',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const req = http.request(options, function (res) {
        console.log('\nFinished sending coverage data.');
        done();
      }).on('error', function (error) {
        console.log(`problem with request: ${error.message}`);
        done();
      });

      if (!fs.existsSync('coverage')) {
        fs.mkdirSync('coverage');
        fs.writeFileSync('coverage/coverage.json', str);
      }

      req.write(str);
      req.end();
      driver.quit();
    });
  });

  describe('Main page', function () {
    it('loads sprites when scrolling', function (done) {
      // check last pokemon doesn't have children
      // scroll and check that they are there
      // scroll up?
      done();
    });

    it('filters to no pokemon when entering an invalid name', function (done) {
      // search asdf;lkajd;s
      // check no pokemon
      done();
    });

    it('filters to correct pokemon by entering a partial name', function (done) {
      // search start of name
      // check results match
      done();
    });

    it('filters to the correct pokemon when entering a valid full name', function (done) {
      page.search('pikachu');
      driver.sleep(1000); // wait for results to filter
      // FIXME: wait for 'progress-mask' div to remove its 'shown class' instead of sleep
      page.getSearchResults().then(function (elements) {
        expect(elements.length).to.equal(1);
        done();
      });
    });
  });

  describe('Details panel for Pikachu', function() {
    it('opens when clicking the correct tile', function (done) {
      // click pikachu tile? by class id? 1st element
      done();
    });

    it('has correct name', function (done) {
      // check that the name is right
      done();
    });

    it('has correct background', function (done) {
      // check the background changes to right colors
      done();
    });

    it('has correct sprite', function (done) {
      // check that the thing opens
      done();
    });

    it('has correct pokedex number', function (done) {
      // check that the number
      done();
    });

    it('has correct stats', function (done) {
      // check that the stats
      done();
    });

    it('has correct sprite', function (done) {
      // check the sprite
      done();
    });

    it('has correct moves', function (done) {
      // check the number of moves is correct
      done();
    });

    it('has correct move that can be clicked', function (done) {
      // check that it opens
      // check info
      done();
    });

    it('has correct move that can be closed after opening', function (done) {
      // check that it closes
      done();
    });

    it('can be closed', function (done) {
      // close the panel
      // check the display
      done();
    });
  });

  describe('Hamburger menu', function () {
    it('closes when clicked', function (done) {
      // close the panel check style
      done();
    });

    it('opens when clicked', function (done) {
      // open the panel check style
      done();
    });
  });
});
