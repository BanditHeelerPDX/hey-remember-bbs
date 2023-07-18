import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import { QUERY_POST } from "../utils/queries";
const Post = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card bg-blue-light-6 m-2 pt-2 pb-4 br-lg text-blue-dark-7">
      <h3 className="font-lg">{post.postAuthor}'s post:</h3>
        <p className="font-xxl text-orange-light-3">{post.postText}</p>
        <div>
          <CommentList comments={post.comments} />
        </div>
        <div className="m-1 p-1">
          <CommentForm postId={post._id} />
        </div>
     
    </div>
  );
};

export default Post;
