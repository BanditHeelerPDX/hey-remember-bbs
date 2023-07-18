import React from "react";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <p className="card bg-blue-dark-4 o-90 br-lg text-orange-light-3">No comments found.</p>;
  }

  return (
    <>
    <div className="container mt-2">
      <div className="card bg-blue-dark-4 o-90 br-lg">
      <h4 className="card-title text-orange-light-3 ml-3">Comments:</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="comment card bg-blue-light-9  mb-1">

          <p className="font-lg">{comment.commentText}</p> <br/>
          <p className="font-md">Posted by: {comment.commentAuthor}</p>
          <p className="font-md">Date: {comment.created}</p>
          
          
        </div>
      ))}
      </div>
    </div>
    </>
  );
};

export default CommentList;