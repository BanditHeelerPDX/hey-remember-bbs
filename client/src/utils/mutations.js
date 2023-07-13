import { gql } from "@apollo/client";

export const ADD_POST = gql`
  mutation createPost($postText: String!, $userId: ID!) {
    createPost(postText: $postText, userId: $userId) {
      _id
      postText
      userId
      postDate
      comments {
        _id
        commentText
        commentAuthor
        commentDate
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
