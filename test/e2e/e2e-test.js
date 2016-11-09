const selenium = require('selenium-webdriver');
// const proxy = require('selenium-webdriver/proxy');
const fs = require('fs');
const expect = require('chai').expect;
const http = require('http');

const By = selenium.By;
const until = selenium.until;

const driver = new selenium.Builder()
    .forBrowser('chrome')
    .build();

describe('Search bar', function () {
  this.timeout(5000);

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

  it('filters to the correct pokemon when entering a valid name', function (done) {
    driver.findElement(By.id('monsters-search-bar')).sendKeys('pikachu');
    driver.sleep(1000); // wait for results to filter
    driver.findElements(By.xpath('//*[@id="monsters-list"]/li')).then(function (elements) {
      expect(elements.length).to.equal(1);
      done();
    });
  });
});
