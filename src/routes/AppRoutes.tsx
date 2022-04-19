import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isAuthenticated } from "../helper/authHelper";
import BrowseProfile from "../pages/browseProfile";
import Chat from "../pages/chat";
import Home from "../pages/home";
import Login from "../pages/login";
import NewPost from "../pages/newPost";
import Profile from "../pages/profile";
import SearchResults from "../pages/searchResults";
import SignUp from "../pages/signup";
export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
  return (
    <Router>
      <Routes>
        {!isAuthenticated() && <Route path="/login" element={<Login />} />}
        {!isAuthenticated() && <Route path="/signup" element={<SignUp />} />}

        {isAuthenticated() && <Route path="/" element={<Home />} />}
        {isAuthenticated() && <Route path="/profile" element={<Profile />} />}
        {isAuthenticated() && (
          <Route path="/post/create" element={<NewPost />} />
        )}
        {isAuthenticated() && (
          <Route path="/search" element={<SearchResults />} />
        )}
        {isAuthenticated() && (
          <Route path="/profile/:userId" element={<BrowseProfile />} />
        )}
        {isAuthenticated() && <Route path="/chat" element={<Chat />} />}
      </Routes>
    </Router>
  );
}
