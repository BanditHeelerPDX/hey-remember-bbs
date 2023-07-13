import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    update(cache, { data: { createComment } }) {
      // Read the cache to get the current post's comments
      const { post } = cache.readQuery({
        query: QUERY_POSTS,
        variables: { id: postId },
      });

      // Update the cache with the new comment
      cache.writeQuery({
        query: QUERY_POSTS,
        variables: { id: postId },
        data: {
          post: {
            ...post,
            comments: [createComment, ...post.comments],
          },
        },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the addComment mutation to create a new comment
      await addComment({
        variables: { commentText, postId },
      });

      // Clear the form input
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add a Comment</h3>
      {error && <div>Error adding comment</div>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="commentText">Comment:</label>
          <textarea
            name="commentText"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Write your comment here..."
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;