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

    const validateTiles = function (actualTiles, expectedTiles) {
      const actual = actualTiles;
      return new Promise(function (resolve, reject) {
        actual.forEach(function (actualTile, i) {
          page.getTileSpriteClass(actualTile).then(function (spriteClass) {
            expect(spriteClass).to.equal(expectedTiles[i].spriteClass);
            page.getTileText(actualTile).then(function(text) {
              expect(text).to.equal(expectedTiles[i].text);
              resolve();
            });
          }).catch(function (err) {
            reject(err);
          });
        });
      });
    };

    const testSearch = function (done, searchString, expectedCount, expectedTiles) {
      page.search(searchString);
      page.getSearchResults().then(function (elements) {
        expect(elements.length).to.equal(expectedCount);
        if (expectedCount > 0) {
          validateTiles(elements, expectedTiles).then(function () {
            page.clearSearch();
            done();
          }).catch(function (err) {
            console.log(err);
            done();
          });
        } else {
          page.clearSearch();
          done();
        }
      });
    };

    it('loads sprites and text when scrolling', function (done) {
      // last pokemon shouldn't have the sprite and text before it's in the viewport
      // scroll to bottom and check that text and sprite were loaded
      let lastTile;
      page.getLastTile().then(function(tile) {
        lastTile = tile;
        return page.getTileChildren(lastTile);
      }).then(function(children) {
        expect(children.length).to.equal(0);
        return page.scrollToBottom();
      }).then(function() {
        return page.getTileSpriteClass(lastTile);
      }).then(function(spriteClass) {
        expect(spriteClass).to.equal('monster-sprite sprite-649');
        return page.getTileText(lastTile);
      }).then(function(tileText) {
        expect(tileText).to.equal('Genesect');
        return page.scrollToTop();
      }).then(function() {
        done();
      }).catch(function(err) {
        throw err;
        done();
      });
    });

    it('filters to no pokemon when entering an invalid name', function (done) {
      const searchString = 'notapokemon';
      const expectedCount = 0;
      const expectedTiles = [];
      testSearch(done, searchString, expectedCount, expectedTiles);
    });

    it('filters to correct pokemon by entering a partial name', function (done) {
      const searchString = 'butter';
      const expectedCount = 1;
      const expectedTiles = [{
        spriteClass: 'monster-sprite sprite-12',
        text: 'Butterfree'
      }];
      testSearch(done, searchString, expectedCount, expectedTiles);
    });

    it('filters to the correct pokemon when entering a valid full name', function (done) {
      const searchString = 'pikachu';
      const expectedCount = 1;
      const expectedTiles = [{
        spriteClass: 'monster-sprite sprite-25',
        text: 'Pikachu'
      }];
      testSearch(done, searchString, expectedCount, expectedTiles);
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
      page.clickHamburgerMenu().then(function() {
        return page.isHamburgerVisibile();
      }).then(function (isVisible) {
        expect(isVisible).to.be.false;
        done();
      }).catch(function (err) {
        throw err;
        done();
      });
    });

    it('opens when clicked', function (done) {
      page.clickHamburgerMenu().then(function() {
        return page.isHamburgerVisibile();
      }).then(function (isVisible) {
        expect(isVisible).to.be.true;
        done();
      }).catch(function (err) {
        throw err;
        done();
      });
    });
  });
});
