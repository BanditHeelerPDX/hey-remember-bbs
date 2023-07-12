import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";

const PostList = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const posts = data.posts;

  return (
    <div>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.postText}</h3>
              <p>Posted by: {post.userId}</p>
              <p>Date: {new Date(post.postDate).toLocaleString()}</p>

              <h4>Comments:</h4>
              {post.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <p>{comment.commentText}</p>
                  <p>Posted by: {comment.commentAuthor.username}</p>
                  <p>Date: {new Date(comment.commentDate).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;