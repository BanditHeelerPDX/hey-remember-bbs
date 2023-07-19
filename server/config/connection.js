const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sea-tec-astronomy"
);

module.exports = mongoose.connection;
