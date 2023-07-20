import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { Link } from "react-router-dom";

const PostList = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }
  const posts = data?.posts || [];
  return (
    <div className="display-f row justify-center mb-2">
      <div className="card col-12-lg bg-blue-dark-4 o-90 m-2 pt-1 pb-2 br-sm text-orange-light-3">
        <h2 className="card-title ml-3">Posts</h2>
        {posts.length === 0 ? (
          <p className="card-body col-12-lg">No posts found.</p>
        ) : (
          <div className="card card bg-blue-light-6 m-2 pt-1 pb-1 br-lg text-purple-dark-7">
            {posts.map((post) => (
              <div key={post._id} className="card-body">
                <div className="card bg-blue-light-9 br-lg m-1">
                  <Link to={`/Post/${post._id}`}>
                    <h3>{post.postText}</h3>
                  </Link>
                  <Link to={`/user/${post.postAuthor}`}>
                    <p>Posted by: {post.postAuthor}</p>
                  </Link>
                  <p>Date: {post.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostList;
