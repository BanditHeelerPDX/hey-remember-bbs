const { model, Schema } = require("mongoose");
const User = require("./User");

const PostSchema = new Schema(
  {
    postAuthor: {
      type: String,
      required: true,
    trim: true,
    },
    postText: {
      type: String,
      required: [true, "Empty posts are not allowed"],
      minlength: [1, "Posts must be at least 1 character long"],
      maxlength: [225, "Posts cannot be longer than 225 characters"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // likes: {
    //   type: Array,
    //   default: [],
    // },
    comments: [
      {
        commentText: {
          type: String,
          required: [true, "Empty comments are not allowed"],
          minlength: [1, "Comments must be at least 1 character long"],
          maxlength: [225, "Comments cannot be longer than 225 characters"],
          trim: true,
        },
        commentAuthor: {
          type: String,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

module.exports = Post;
