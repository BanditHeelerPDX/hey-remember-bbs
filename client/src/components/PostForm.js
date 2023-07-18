import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";
import Auth from "../utils/auth"

const PostForm = () => {
  const [postText, setPostText] = useState("");
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      // Update the cached posts list with the new post
      try {
      const { posts } = cache.readQuery({ query: QUERY_POSTS });

      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    } catch (e) {
      console.error(e);
    }
  }
  })
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });

      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    setPostText(event.target.value);
  }
  
  return (
    <div className="display-f justify-center mb-1">
      <div className="col-12 col-12-md">
        <div className="mt-2 card bg-blue-dark-4 o-90">
          <h2 className="card-title text-orange-light-3 ml-3">
            Create a New Post
          </h2>
          {Auth.loggedIn() ? (
            <>
          {error && <p className="text-orange-light-3 font-sm">Error creating post</p>}
          <form onSubmit={handleFormSubmit}>
            <textarea
              name="postText"
              value={postText}
              onChange={handleChange}
              placeholder="Write your post here..."
              className="card col-12-xs mb-2 bg-blue-light-9"
            ></textarea>

            <button
              className="btn-outlined-orange text-blue text-hover-white"
              type="submit"
            >
              Submit
            </button>
            {error && (
            <div>
                {error.message}
              </div>
            )}
          </form>
        
      
      </>
      ) : (
      <p className="text-orange-light-3">You need to be logged in to share your post.</p>
      )}
      </div>
      </div>
    </div>
  );
};



export default PostForm;
