import { gql } from "@apollo/client";

export const QUERY_POSTS = gql`
  query getProfilePosts {
    posts {
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
