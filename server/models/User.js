const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const Friend = require("./Friend");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    minlength: [3, "Please provide a username with at least 3 characters"],
  },
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [10, "Please provide a password with at least 10 characters"],
  },
  friends: [Friend.schema],
  // profilePicture: {
  //     type: String,
  // }
});

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 16);
  }

  next();
});

UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

// const { Schema, model } = require("mongoose");

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   minions: { type: Array, default: [] },
//   friends: { type: Array, default: [] },
// });

// module.exports = model("User", userSchema);
