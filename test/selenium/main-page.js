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

  clearSearch() {
    // get search bar.clear()
    // or if that doesn't work
    // webElement.sendKeys(Keys.CONTROL + "a");
    // WebElement.sendKeys(Keys.DELETE);
  }

  getSearchResults() {
    return this.driver.findElements(searchResultsLocator);
  }

  getTileSprite(webElement) {
    // return webElement.then()
    // get the sprite element from the webelement passed in
  }

  getTileText(webElement) {
    // get the span text from webelement passed in
  }

  clickTile(webElement) {
    // click the tile
  }

  scroll() {
    // stuff
  }

  waitForLoadingComplete() {
    // wait for 'progress-mask' div to remove its 'shown class' instead of sleep
  }

  clickHamburgerMenu() {
    // click it
  }

  isHamburgerVisibile() {
    // get the display attributes or sommething to check that visibility
    // return boolean
  }
}

module.exports = MainPage;
