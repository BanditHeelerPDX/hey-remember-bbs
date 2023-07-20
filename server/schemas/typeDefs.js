const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String
    posts: [Post]!
    friends: [User]!
  }

  type Post {
    _id: ID!
    postText: String!
    postAuthor: User
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID!
    commentText: String
    commentAuthor: User
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]
    post(postId: ID!): Post
    posts(username: String): [Post]
    myself: User
    friend(friendId: ID!): User
    friends: [User]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createPost(postText: String!): Post
    deletePost(postId: ID!): Post
    createComment(postId: ID!, commentText: String!): Post
    deleteComment(postId: ID!, commentId: ID!): Post
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
