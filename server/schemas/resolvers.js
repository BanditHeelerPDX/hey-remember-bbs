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
        }
    },
    Mutation: {