import React from "react";

// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

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
    <div className="card bg-blue-light-9 m-2 pt-2 pb-4 br-lg text-blue-dark-7">
      <h3 className="card-title">{post.postAuthor}</h3>
      <div className="bg-light py-4">
        <p className="card-body">{post.postText}</p>
      </div>

      <div className="my-5">
        <CommentList comments={post.comments} />
      </div>
      <div className="m-3 p-4">
        <CommentForm postId={post._id} />
      </div>
    </div>
  );
};

export default Post;
