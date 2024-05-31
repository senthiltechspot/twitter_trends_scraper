

const { scrapeTwitter } = require("./scraperLogic");

async function runScraper() {
  try {
    return await scrapeTwitter();
  } catch (error) {
    console.error("An error occurred during the scraping process:", error);
    throw error;
  }
}

module.exports = { runScraper };
