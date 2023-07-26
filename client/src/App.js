import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Logon from "./pages/Logon";
import Signup from "./pages/Signup";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Post from "./pages/Post";
import User from "./pages/User";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="app-container flex-column justify-flex-start bg-blue-light-9">
          <Header />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:postId" element={<Post />} />
              <Route path="/me" element={<User />} />
              <Route path="/user/:username" element={<User />} />
              <Route path="/logon" element={<Logon />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
