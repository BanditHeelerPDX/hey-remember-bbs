
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:/phonebook")

module.exports = mongoose.connection;


