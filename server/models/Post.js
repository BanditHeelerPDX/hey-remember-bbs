const { model, Schema } = require("mongoose");
const User = require("./User");

const PostSchema = new Schema({
  postText: {
    type: String,
    required: [true, "Empty posts are not allowed"],
    minlength: [1, "Posts must be at least 1 character long"],
    maxlength: [225, "Posts cannot be longer than 225 characters"],
    trim: true,
  },
  postAuthor: [User.schema],
  postDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: [true, "Empty comments are not allowed"],
        minlength: [1, "Comments must be at least 1 character long"],
        maxlength: [225, "Comments cannot be longer than 225 characters"],
        trim: true,
      },
      commentAuthor: [User.schema],
      commentDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = model("Post", PostSchema);

module.exports = Post;
