import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../utils/mutations";
import Auth from "../utils/auth";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");

  const [createComment, { error }] = useMutation(CREATE_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target; // Get the value from the textarea
    setCommentText(value); // Update the commentText state with the textarea value
  };

  return (
    <div className="container mt-2">
      <div className="card bg-blue-dark-4 o-90 br-lg">
        <h3 className="card-title text-orange-light-3 ml-3">Add a Comment</h3>
        {error && <div>Error adding comment</div>}
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="commentText">Comment:</label>
            <textarea
              name="commentText"
              value={commentText}
              onChange={handleChange}
              placeholder="Write your comment here..."
              className="card col-12-xs mb-2 bg-blue-light-9"
            />
          </div>
          <button
            className="btn-outlined-orange text-blue text-hover-white"
            type="submit"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
