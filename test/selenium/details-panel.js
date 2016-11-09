const selenium = require('selenium-webdriver');

const By = selenium.By;

class DetailsPanel {
  constructor(driver) {
    this.driver = driver;
  }

  close() {
    // close it
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
