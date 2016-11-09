const selenium = require('selenium-webdriver');

const By = selenium.By;

const searchBarLocator = By.id('monsters-search-bar');
const searchResultsLocator = By.xpath('//*[@id="monsters-list"]/li');

class MainPage {
  constructor(driver) {
    this.driver = driver;
  }

  search(searchString) {
    return this.driver.findElement(searchBarLocator).sendKeys(searchString);
  }

  getSearchResults() {
    return this.driver.findElements(searchResultsLocator);
  }
}

module.exports = MainPage;
