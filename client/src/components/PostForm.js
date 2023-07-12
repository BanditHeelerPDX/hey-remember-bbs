import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS } from "../utils/queries";

const PostForm = ({ userId }) => {
  const [postText, setPostText] = useState("");
  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { createPost } }) {
      // Update the cached posts list with the new post
      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [createPost, ...posts] },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the addPost mutation to create a new post
      await addPost({
        variables: { postText, userId },
      });

      // Clear the form input
      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      {error && <div>Error creating post</div>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="postText">Post Text:</label>
          <textarea
            name="postText"
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            placeholder="Write your post here..."
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default PostForm;
