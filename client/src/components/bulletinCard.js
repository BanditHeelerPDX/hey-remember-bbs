import React from 'react';

const BulletinCard = ({ post }) => {
    const { postText, postAuthor, postDate, comments } = post;
  
    return (
      <div className="bulletin-card">
        <h3>{postText}</h3>
        <p>Posted by: {postAuthor.name}</p>
        <p>Date: {new Date(postDate).toLocaleString()}</p>
  
        <h4>Comments:</h4>
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p>{comment.commentText}</p>
            <p>Posted by: {comment.commentAuthor.name}</p>
            <p>Date: {new Date(comment.commentDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default BulletinCard;