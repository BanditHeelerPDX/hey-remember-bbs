import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

import { QUERY_USER, QUERY_MYSELF } from "../utils/queries";

import Auth from "../utils/auth";

const User = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_MYSELF, {
    variables: { username: userParam },
  });

  const user = data?.myself || data?.user || {};
  console.log(userParam);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-1">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-1">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        {!userParam && (
          <div className="col-12 col-md-10 mb-1 p-2">
            <PostForm />
          </div>
        )}
      </div>
      <div className="col-12 col-md-10 mb-1">
        <PostList
          posts={user.posts}
          title={`${user.username}'s posts...`}
          showTitle={false}
          showUsername={false}
        />
      </div>
    </div>
  );
};

export default User;
