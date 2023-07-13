import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p>No comments found.</p>;
  }

  return (
    <div>
      <h4 className="mt-2">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment card bg-orange-light-2">
          <p className="card-body">{comment.commentText}</p>
          <p>Posted by: {comment.commentAuthor.username}</p>
          <p>Date: {new Date(comment.commentDate).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;