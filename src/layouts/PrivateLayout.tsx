import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import { useAppSelector } from "../app/hooks";
import Header from "../features/header/Header";
import Navigation from "../features/navigation/Navigation";
import SidebarFriends from "../features/sidebar-friends/SidebarFriends";
import MobileNavigation from "../features/mobile-navigation/MobileNavigation";

const PrivateLayout: React.FC = () => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const headerTitle = useLocation().pathname;

  const currentPage =
    routes.find((route) => new RegExp(route.path).test(headerTitle))?.label ||
    routes[0].label;
  console.log(headerTitle)
  if (!isAuth) return <Navigate to={"/auth/login"} />;
  return (
    <>
      <Header currentPage={currentPage} />
      <main>
        <Navigation />
        <div className="container-main">
          <Outlet />
        </div>
        <SidebarFriends />
        <MobileNavigation currentPage={currentPage} />
      </main>
    </>
  );
};

export default PrivateLayout;
