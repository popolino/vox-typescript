// @ts-ignore
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../profile/Profile";
import Navigation from "./Navigation/Navigation";
import Users from "../users/Users";
import { useAppSelector } from "../../app/hooks";
import Header from "./Header/Header";
import SidebarFriends from "./SidebarFriends/SidebarFriends";
import { TUser } from "../users/Users.types";

export type TRouterProps = {
  friends: TUser[];
  setCurrentId: (id: number) => void;
};

const Router: React.FC<TRouterProps> = ({ friends, setCurrentId }) => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  if (!isAuth) return <Navigate to={"/auth/login"} />;

  return (
    <>
      <Header />
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
        <SidebarFriends friends={friends} setCurrentId={setCurrentId} />
      </main>
    </>
  );
};

export default Router;
