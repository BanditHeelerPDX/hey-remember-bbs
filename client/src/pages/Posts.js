import React, { useState } from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

// This is going to return a html chunk that will have the header "Bulletin", a bar to swap post types,
// and below those two, a section full of card that will be user posted thoughts/comments, etc
const Posts = () => {
  //These are used to handle the drop menu options.
  const [Value, setValue] = useState[0];

  const valueHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className=" font-lg container mt-3 p-1 text-orange-light-3 bg-blue-dark-4">
      <div className="row justify-center">
        <div className="col-12-xs col-10-md">
          <PostForm />
        </div>
        <div className="row justify-center">
          <div className="col-12-xs col-10-md">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
