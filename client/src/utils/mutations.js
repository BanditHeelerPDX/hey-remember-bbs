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
