const { Builder, By, until } = require("selenium-webdriver");
const axios = require("axios");

const TWITTER_USERNAME = process.env.TWITTER_USERNAME;
const TWITTER_PASSWORD = process.env.TWITTER_PASSWORD;
const PROXYMESH_URL = process.env.PROXYMESH_URL;

async function loginToTwitter(driver) {
  await driver.get("https://x.com/i/flow/login");

  // Wait for the username input to be present
  await driver.wait(until.elementLocated(By.name("text")), 10000);

  const usernameField = await driver.findElement(By.name("text"));
  await usernameField.sendKeys(TWITTER_USERNAME);

  // Wait for and click the next button
  const nextButton = await driver.findElement(
    By.css(".css-175oi2r:nth-child(6) .css-1jxf684 > .css-1jxf684")
  );
  await nextButton.click();

  // Wait for the userName input to be present
  const confirmuserNameField = await driver.wait(
    until.elementLocated(By.name("text")),
    100000
  );

  if (confirmuserNameField) {
    await confirmuserNameField.sendKeys("DroitGo");

    // Wait for and click the next button
    const confirmNextButton = await driver.findElement(
      By.css(".r-19yznuf > .css-146c3p1")
    );
    await confirmNextButton.click();
  }

  await driver.wait(until.elementLocated(By.name("password")), 10000);

  const passwordField = await driver.findElement(By.name("password"));
  await passwordField.sendKeys(TWITTER_PASSWORD);

  // Wait for and click the login button
  const loginButton = await driver.findElement(
    By.css(".r-19yznuf > .css-146c3p1")
  );
  await loginButton.click();

  // Wait for the password input to be present

  // Wait until the home page is loaded
  await driver.wait(until.urlContains("home"), 10000);
}

async function fetchTrendingTopics(driver) {
  await driver.get("https://x.com/search?q=%23StockUpdate");

  // Wait for the trending topics section to be loaded
  await driver.wait(
    until.elementLocated(By.css('div[aria-label="Timeline: Trending now"]')),
    10000
  );

  // Get the trending topics elements
  const trends = await driver.findElements(
    By.css(
      'div[aria-label="Timeline: Trending now"] div[data-testid="trend"] span.css-1jxf684'
    ),
    1000
  );

  // Extract text from the top 5 trending topics
  const top5Trends = [];
  for (let i = 0; i < trends.length; i++) {
    const topics = await trends[i].getText();
    if (topics.includes("#")) top5Trends.push(topics);
  }
  console.log(top5Trends);
  //   limit to top 5
  return top5Trends.slice(0, 5);
}

async function scrapeTwitter() {
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();
  options.addArguments("start-maximized");
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("--disable-blink-features=AutomationControlled");
  // options.addArguments("--proxy-server=" + PROXYMESH_URL);

  // console.log("Using Proxy:", PROXYMESH_URL);

  // Build the Chrome driver
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await loginToTwitter(driver);
    const [trends, ipAddress] = await Promise.all([
      fetchTrendingTopics(driver),
      fetchIPAddress(),
    ]);
    return {
      trends,
      ip_address: ipAddress,
    };
  } catch (error) {
    console.error("An error occurred during the scraping process:", error);
    throw error;
  } finally {
    await driver.quit();
  }
}

async function fetchIPAddress() {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error(
      "Error fetching IP address from ipify, trying alternative service."
    );
    const response = await axios.get("https://api.my-ip.io/ip.json");
    return response.data.ip;
  }
}

module.exports = { scrapeTwitter };
