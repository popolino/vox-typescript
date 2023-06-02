// @ts-ignore
import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../profile/Profile";
import Navigation from "./Navigation/Navigation";
import Users from "../users/Users";

const Router = () => {
  return (
    <>
      {/*<Header />*/}
      <main>
        <Navigation />
        <div className="container-main">
          <Routes>
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/" element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        {/*<SidebarFriendsContainer {...props} />*/}
      </main>
    </>
  );
};

export default Router;
