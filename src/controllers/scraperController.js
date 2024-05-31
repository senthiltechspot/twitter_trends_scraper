const Trend = require("../model/Trends");
const { runScraper } = require("../utils/scraper");

/**
 * Run the scraper to fetch trending topics from Twitter and store them in the database.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
async function runScript(req, res) {
  try {
    // Run the scraper to fetch trending topics
    const result = await runScraper();

    // Store the fetched data in the database
    const data = await saveTrendsToDatabase(result);

    // Send the HTML response
    res.send({
      trends: data.trends,
      ip_address: data.ip_address,
      date: new Date(data.createdAt).toLocaleString(),
    });
  } catch (error) {
    console.error("An error occurred during the scraping process:", error);
    res.status(500).send("Internal Server Error");
  }
}

/**
 * Save the fetched trending topics and IP address to the database.
 * @param {Object} result - Object containing trending topics and IP address
 */
async function saveTrendsToDatabase(result) {
  return await Trend.create({
    trends: result.trends,
    ip_address: result.ip_address,
  });
}

module.exports = { runScript };
