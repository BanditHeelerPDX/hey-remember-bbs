const { User, Post, Friend } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsers: async () => {
      return User.find().populate("posts");
    },
    getUserByUsername: async (parent, { username }) => {
      return User.findOne({ username }).populate("posts");
    },
    getPosts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    getPostByID: async (parent, { _id }) => {
      return Post.findOne({ _id });
    },
    getFriends: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Friend.find(params);
    },
    getFriendByUsername: async (parent, { friendId }) => {
      return Friend.findOne({ friendId });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (
      parent,
      { username, firstName, lastName, email, password }
    ) => {
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    addPost: async (parent, { postText, postAuthor }) => {
      return Post.create({ postText, postAuthor });
    },
    addFriend: async (parent, { friendId }, context) => {
      return user.findOneAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: { friends: friendId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updateFriend: async (parent, { friendId, status }, context) => {
      return Friend.findOneAndUpdate(
        { _id: friendId },
        { status: status },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeFriend: async (parent, { friendId }, context) => {
      return Friend.findOneAndDelete(
        { _id: friendId },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePost: async (parent, { _id }, context) => {
      return Post.findOneAndDelete(
        { _id: _id },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    updatePost: async (parent, { _id, postText }, context) => {
      return Post.findOneAndUpdate(
        { _id: _id },
        { postText: postText },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
