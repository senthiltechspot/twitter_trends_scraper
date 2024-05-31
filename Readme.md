# Twitter Web Scraper API

This project is a Node.js server API for scraping data from Twitter. The following instructions will help you set up and run the server locally.

## Prerequisites

Ensure you have the following software installed on your machine:

- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/)
- **npm**: Node.js package manager (usually comes with Node.js)
- **Google Chrome**: Required for web scraping

## Environment Variables

Create a `.env` file in the root directory of your project and add the following variables:

```env
MONGODB_URI=mongodburi
DB_NAME=twitter_scraper
TWITTER_USERNAME=username/email
TWITTER_PASSWORD=password
PROXYMESH_URL=proxyurl

```

Replace the placeholder values with your actual credentials and URLs.
- MONGODB_URI: Your MongoDB connection string.
- DB_NAME: The name of the database you want to use for storing scraped data.
- TWITTER_USERNAME: The username or email for your Twitter account.
- TWITTER_PASSWORD: The password for your Twitter account.
- PROXYMESH_URL: The URL for your ProxyMesh service

# Installation
To install the required npm packages, run the following command in the root directory of your project:

```bash
npm install
```

# Start Server

To start the server, run the following command in the root directory of your project:

```bash
npm start
```

# Notes

- The server is running on port 3000.
- Ensure Google Chrome is installed on your machine as it is required for the web scraping operations.
- The server uses Puppeteer for browser automation and web scraping tasks.

### Preview 

![Twitter Web Scraper API](https://res.cloudinary.com/djlmmcnyh/image/upload/v1717171821/Screenshot_2024-05-31_160326_gaom66.png)

This README provides the basic setup instructions for running the Twitter Web Scraper API locally. Ensure you have all prerequisites installed and environment variables set up correctly for smooth operation.