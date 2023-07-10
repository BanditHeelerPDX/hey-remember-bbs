const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    firstName: String
    lastName: String
    email: String
    password: String
    posts: [Post]!
    friends: [Friend]!
  }

  type Post {
    _id: ID
    postText: String
    postAuthor: String
    createdAt: String
  }

  type Friend {
    friendId: ID
    user: User
    status: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUsers: [User]
    getUserByUsername(username: String): User
    getPosts(username: String): [Post]
    getPostByID(_id: ID!): Post
    getFriends(username: String): [Friend]
    getFriendByUsername(username: String): Friend
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPost(postText: String!, postAuthor: String!): Post
    addFriend(friendId: ID!): Friend
    updateFriend(friendId: ID!, status: String!): Friend
    removeFriend(friendId: ID!): Friend
    removePost(_id: ID!): Post
    updatePost(_id: ID!, postText: String!): Post
  }
`;

module.exports = typeDefs;

// const { gql } = require("apollo-server-express");

// const typeDefs = gql`
//   type User {
//     id: ID!
//     username: String!
//     email: String!
//     followers: [ID!]!
//     followings: [ID!]!
//   }

//   type Post {
//     id: ID!
//     userId: ID!
//     content: String!
//     likes: [ID!]!
//   }

//   type Query {
//     getUser(id: ID!): User!
//     getPost(id: ID!): Post!
//     getTimelinePosts(userId: ID!): [Post!]!
//   }

//   type Mutation {
//     registerUser(username: String!, email: String!, password: String!): User!
//     loginUser(email: String!, password: String!): User!
//     updateUser(id: ID!, username: String, email: String, password: String): User!
//     deleteUser(id: ID!): String!
//     createPost(userId: ID!, content: String!): Post!
//     updatePost(id: ID!, userId: ID!, content: String!): String!
//     deletePost(id: ID!, userId: ID!): String!
//     likePost(id: ID!, userId: ID!): String!
//     dislikePost(id: ID!, userId: ID!): String!
//     followUser(id: ID!, userId: ID!): String!
//     unfollowUser(id: ID!, userId: ID!): String!
//   }
// `;

// module.exports = typeDefs;
