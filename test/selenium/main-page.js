const selenium = require('selenium-webdriver');

const By = selenium.By;

const searchBarLocator = By.id('monsters-search-bar');
const searchResultsLocator = By.xpath('//*[@id="monsters-list"]/li');
const progressMaskLocator = By.css('#progress-mask');
const tileSpriteLocator = By.css('button.monster-sprite');
const tileTextLocator = By.css('span');
const allLocator = By.css('all');
const hamburgerMenuButtonLocator = By.css('.sidedrawer-toggle.mui--hidden-xs.js-hide-sidedrawer.hover-shadow');
const contentWrapperLocator = By.id('content-wrapper');

class MainPage {
  constructor(driver) {
    this.driver = driver;
    this.progressMask = this.driver.findElement(progressMaskLocator);
  }

  search(searchString) {
    this.driver.findElement(searchBarLocator).sendKeys(searchString);
    this.waitForLoadingComplete();
  }

  clearSearch() {
    this.driver.findElement(searchBarLocator).clear();
    this.waitForLoadingComplete();
  }

  getSearchResults() {
    return this.driver.findElements(searchResultsLocator);
  }

  getLastTile() {
    return this.getSearchResults()
    .then((tiles) => {
      return tiles[tiles.length - 1];
    })
    .catch((err) => {
      throw err;
    });
  }

  getTileChildren(webElement) {
    return webElement.findElements(allLocator);
  }

  getTileSpriteClass(webElement) {
    return webElement.findElement(tileSpriteLocator).getAttribute('class');
  }

  getTileText(webElement) {
    return webElement.findElement(tileTextLocator).getText();
  }

  waitForTileToLoad(webElement) {
    const tile = webElement;
    return this.driver.wait(() => {
      tile.findElements(allLocator).length >= 0;
    }, 1500).catch((err) => {
      throw err;
    });
  }

  clickTile(webElement) {
    // click the tile
  }

  scrollToBottom() {
    return this.driver.executeScript("window.scrollTo(0,document.body.scrollHeight);").then(() => {
      return this.driver.sleep(1000);
    }).catch((err) => {
      throw err;
    });
  }

  scrollToTop() {
    return this.driver.executeScript("window.scrollTo(0, 0);").then(() => {
      return this.driver.sleep(1000);
    }).catch((err) => {
      throw err;
    });
  }

  waitForLoadingComplete() {
    // FIXME: the conditional doesn't actually work, so this is just a timer
    return this.driver.wait(() => {
      !this.progressMask.isDisplayed();
    }, 1000).catch(() => {});
  }

  clickHamburgerMenu() {
    return this.driver.findElement(hamburgerMenuButtonLocator).click()
    .catch(() => {
      try {
        return this.driver.findElement(hamburgerMenuButtonLocator).click();
      } catch (e) {
        throw e;
      }
    });
  }

  isHamburgerVisibile() {
    return this.driver.findElement(contentWrapperLocator).getCssValue('margin-left')
    .then((attribute) => {
      return attribute == '200px';
    });
  }
}

module.exports = MainPage;
