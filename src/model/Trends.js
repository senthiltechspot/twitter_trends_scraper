const mongoose = require("mongoose");

const trendSchema = new mongoose.Schema(
  {
    trends: { type: [String], required: true },
    ip_address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Trend = mongoose.model("Trend", trendSchema);

module.exports = Trend;
