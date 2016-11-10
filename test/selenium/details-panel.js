const selenium = require('selenium-webdriver');

const By = selenium.By;

const backButtonLocator = By.css('button.back-button.detail-back-button.hover-shadow');

class DetailsPanel {
  constructor(driver) {
    this.driver = driver;
  }

  close() {
    // close it
    return this.driver.findElement(backButtonLocator).click()
    .catch(() => {
      try {
        return this.driver.sleep(1000).then(() => {
          return this.driver.findElement(backButtonLocator).click();
        });
      } catch (e) {
        throw e;
      }
    });
  }

  isVisible() {
    // check if visible
  }

  getTitle() {

  }

  getSprite() {

  }

  getBackground() {

  }

  getNumber() {

  }

  // other stat specific getters for each? or return them all in a object in getStats()
  getStats() {
    // return stats element
  }

  getNaturalMoves() {

  }

  getNaturalMoves() {

  }

  getMachineMoves() {

  }

  getTutorMoves() {

  }

  getEggMoves() {

  }

  clickMove(name) {
    // click the dropdown button for move with name
  }

  isMoveDetailVisible(name) {
    // check if moves-row-detail size or y transform
  }

  getMoveInfo(name) {
    // get move info for move with name
  }

}

module.exports = DetailsPanel;
