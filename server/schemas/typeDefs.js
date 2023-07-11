const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    # firstName: String
    # lastName: String
    email: String!
    posts: [Post]!
    friends: [ID!]!
    minions: [ID!]!
  }

  type Post {
    _id: ID!
    postText: String
    userId: ID!
    postDate: String
    # likes: [ID!]!
  }

  type Comment {
    _id: ID!
    commentText: String
    commentAuthor: User
    commentDate: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User!
    getPost(id: ID!): Post!
    getProfilePosts(userId: ID!): [Post!]!
  }

  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User!
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
    ): User!
    deleteUser(id: ID!): String!
    createPost(userId: ID!, content: String!): Post!
    updatePost(id: ID!, userId: ID!, content: String!): String!
    deletePost(id: ID!, userId: ID!): String!
    # likePost(id: ID!, userId: ID!): String!
    # dislikePost(id: ID!, userId: ID!): String!
    followUser(id: ID!, userId: ID!): String!
    unfollowUser(id: ID!, userId: ID!): String!
  }
`;

module.exports = typeDefs;
