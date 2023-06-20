// @ts-ignore
import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Profile from "../profile/Profile";
import Navigation from "./Navigation/Navigation";
import Users from "../users/Users";
import { useAppSelector } from "../../app/hooks";
import Header from "./Header/Header";
import SidebarFriends from "./SidebarFriends/SidebarFriends";
import { TUser } from "../users/Users.types";
import Messenger from "../messenger/Messenger";
import MobileNavigation from "./MobileNavigation/MobileNavigation";

export type TRouterProps = {
  friends: TUser[];
  setCurrentId: (id: number) => void;
  onLogout: () => void;
};

const Router: React.FC<TRouterProps> = ({
  friends,
  setCurrentId,
  onLogout,
}) => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const authUser = useAppSelector((state) => state.profileReducer.authUser);

  const prof = useParams();
  const headerTitle = Object.entries(prof)
    .map(([key, value]) => `${value}`)
    .join(", ");

  if (!isAuth) return <Navigate to={"/auth/login"} />;
  return (
    <>
      <Header
        authUser={authUser}
        onLogout={onLogout}
        headerTitle={headerTitle}
      />
      <main>
        <Navigation />
        <div className="container-main">
          <Routes>
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile/" element={<Profile />} />
            <Route path="/" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/messenger"
              element={<Messenger friends={friends} />}
            />
          </Routes>
        </div>
        <SidebarFriends friends={friends} setCurrentId={setCurrentId} />
        <MobileNavigation headerTitle={headerTitle} />
      </main>
    </>
  );
};

export default Router;
