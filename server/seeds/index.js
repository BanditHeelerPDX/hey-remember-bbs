const mongoose = require("mongoose");
const { User, Post } = require("../models");
const { users } = require("./userSeeds");
const { posts } = require("./postSeeds");
const { db } = require("../config/connection");

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const seedAll = async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});

    await User.insertMany(users);

    await Post.insertMany(posts);

    console.log("Baby all done!");
  } catch (err) {
    console.error("Baby not done", err);
  } finally {
    mongoose.connection.close();
  }
};

seedAll();
