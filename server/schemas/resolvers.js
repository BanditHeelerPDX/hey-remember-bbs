const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    users: async () => {
      return User.find().populate("posts");
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    myself: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).populate(
          "posts"
        );
        return user;
      }
      throw new AuthenticationError(
        "Come back and see us after you have logged in!"
      );
    },
    friend: async (parent, { friendId }) => {
      try {
        const friend = await User.findbyId(friendId).populate("posts");
        if (!friend) {
          throw new Error(
            "I am not saying you do not have friends, only that I cannot find this one!"
          );
        }
        return friend;
      } catch (err) {
        throw new Error(
          "What we have here is a failure to locate your friend!"
        );
      }
    },
    friends: async (parent, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You need to be logged in to see your friends!"
          );
        }
        const user = await User.findById(context.user._id).populate("friends");
        return user.friends;
      } catch (err) {
        throw new Error(
          "No one is saying you do not have friends, we just cannot find them right now!"
        );
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "That email does not appear to exist in our database.  Please check your creds and try again."
        );
      }

      const cPw = await user.isCorrectPassword(password);

      if (!cPw) {
        throw new AuthenticationError(
          "That password does not appear to be correct.  Please check your creds and try again."
        );
      }

      const token = signToken(user);
      return { token, user };
    },
    createPost: async (parent, { postText }, context) => {
      if (context.user) {
        const post = await Post.create({
          postText,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError(
        "You need to be logged in to create a post!"
      );
    },
    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          postAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a post!"
      );
    },
    createComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: {
                commentText,
                commentAuthor: context.user.username,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to comment on a post!"
      );
    },
    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: { _id: commentId, postAuthor: context.user.username },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a comment!"
      );
    },
  },
};

module.exports = resolvers;
