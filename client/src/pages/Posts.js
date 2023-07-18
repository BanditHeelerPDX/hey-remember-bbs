import React from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Posts = () => {
  return (
    <div className=" font-lg container">
      
        <div className="col-12">
          <PostForm />
        </div>
        <div className="col">
          <PostList />
        </div>
     
    </div>
  );
};

export default Posts;
