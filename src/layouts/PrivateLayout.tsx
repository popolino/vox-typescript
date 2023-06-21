import React from "react";
import classes from "./PublicLayouts.module.scss";
import Header from "../features/Header/Header";
import Navigation from "../features/Navigation/Navigation";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { routes } from "../routes/routes";
import SidebarFriends from "../features/SidebarFriends/SidebarFriends";
import MobileNavigation from "../features/MobileNavigation/MobileNavigation";
import { useAppSelector } from "../app/hooks";

type TPublicLayoutsProps = {};

const PrivateLayout: React.FC<TPublicLayoutsProps> = ({}) => {
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);

  const headerTitle = useLocation().pathname;
  const currentPage =
    routes.find((route) => new RegExp(route.path).test(headerTitle))?.path ||
    "";

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
