const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || process.env.COMPASS);

module.exports = mongoose.connection;
