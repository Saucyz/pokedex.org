const selenium = require('selenium-webdriver');

const By = selenium.By;

class DetailsPanel {
  constructor(driver) {
    this.driver = driver;
  }
}

module.exports = DetailsPanel;
