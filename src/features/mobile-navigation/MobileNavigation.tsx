import React from "react";
import classes from "./MobileNavigation.module.scss";
import { IconButton } from "@mui/material";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { routes } from "../../routes/routes";
import { TContainer_NavigationProps } from "../header/container/Container";

const MobileNavigation: React.FC<TContainer_NavigationProps> = ({
  currentPage,
}) => {
  return (
    <div className={classes.container}>
      {routes
        .filter((route) => route.showOnMobile)
        .map((route, i) => (
          <NavLink to={"/" + route.path} key={i}>
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
