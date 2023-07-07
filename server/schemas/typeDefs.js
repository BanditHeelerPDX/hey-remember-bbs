const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
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

    type Query {
        getUsers: [User]
        getUserByID(_id: ID!): User
        getPosts(username: String): [Post]
        getPostByID(_id: ID!): Post
        getFriends(username: String): [Friend]
        getFriendById(friendId: ID!): Friend
    }

    type Mutation {
createUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!): Auth
createPost



