import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return <p>No comments found.</p>;
  }

  return (
    <div className="container mt-2">
      <div className="card bg-blue-dark-7 o-90 br-lg">
      <h4 className="card-title text-orange-light-3 ml-3">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment card bg-orange-light-3">
          <p className="card-body">{comment.commentText}</p>
          <p>Posted by: {comment.commentAuthor.username}</p>
          <p>Date: {new Date(comment.commentDate).toLocaleString()}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default CommentList;