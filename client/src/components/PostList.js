import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import CommentList from "./CommentList";

const PostList = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  const posts = data.posts;

  return (
    <div className="card bg-purple-light-9 m-2 pt-2 pb-4 br-lg text-purple-dark-7">
      <h2 className="card-title">Posts</h2>
      {posts.length === 0 ? (
        <p className="card-body">No posts found.</p>
      ) : (
        <div className="card bg-purple-light-9 m-2 pt-2 pb-4 br-lg text-purple-dark-7">
          {posts.map((post) => (
            <div key={post._id} className="post card-body">
              <h3>{post.postText}</h3>
              <p>Posted by: {post.userId}</p>
              <p>Date: {new Date(post.postDate).toLocaleString()}</p>
              <CommentList comments={post.comments} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;