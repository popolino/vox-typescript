import React from "react";
import classes from "./MobileNavigation.module.scss";
import { IconButton } from "@mui/material";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import { TContainer_NavigationProps } from "../Header/Container/Container";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { routes } from "../../routes/routes";

const MobileNavigation: React.FC<TContainer_NavigationProps> = ({
  currentPage,
}) => {
  return (
    <div className={classes.container}>
      {routes
        .filter((route) => route.showOnMobile)
        .map((route) => (
          <NavLink to={"/" + route.path}>
            <IconButton
              size="large"
              className={clsx({ [classes.active]: currentPage === route.path })}
            >
              <SvgSelector id={route.iconId} />
            </IconButton>
          </NavLink>
        ))}
    </div>
  );
};

export default MobileNavigation;
