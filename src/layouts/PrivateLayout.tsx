import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Header from "../features/header/Header";
import Navigation from "../features/navigation/Navigation";
import SidebarFriends from "../features/sidebar-friends/SidebarFriends";
import MobileNavigation from "../features/mobile-navigation/MobileNavigation";

const PrivateLayout: React.FC = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const headerTitle = useAppSelector((state) => state.usersReducer.headerTitle);

  if (!isAuth) return <Navigate to={"/auth/login"} />;

  return (
    <>
      <Header />
      <main>
        <Navigation />
        <div className="container-main">
          <Outlet />
        </div>
        <SidebarFriends />
        <MobileNavigation headerTitle={headerTitle} />
      </main>
    </>
  );
};

export default PrivateLayout;
