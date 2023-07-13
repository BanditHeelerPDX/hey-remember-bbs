import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/login';
import Logout from './pages/logout';
import Bulletin from './pages/bulletin';
import Nav from './components/taskbar';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import SingleThought from './pages/SingleThought';
import Profile from "./pages/profile";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
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
        <div className="flex-column justify-flex-start min-100-vh">
        <Nav />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route 
            path='/bulletin'
            element={<Bulletin />}
          />
          <Route 
            path='/profile/:id'
            element={<Profile />}
          />
          <Route
            path='/login'
            element={<Login/>}
          />
          <Route 
            path='/logout'
            element={<Logout />}
          />
        </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
