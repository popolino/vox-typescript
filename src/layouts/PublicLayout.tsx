import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./PublicLayout.module.scss";

type TPublicLayoutProps = {};

const PublicLayout: React.FC<TPublicLayoutProps> = ({}) => {
  return <Outlet />;
};

export default PublicLayout;
