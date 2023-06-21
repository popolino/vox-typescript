import React from "react";
import classes from "./NavList.module.scss";
import { NavLinkComponent } from "./NavLinkComponent";
import { Navigate } from "react-router";
import { useBoundActions } from "../../../app/store";
import { fetchLogout } from "../../Auth/AuthSlice";
import { routes } from "../../../routes/routes";

const NavList = () => {
  return (
    <div className={classes.navigation}>
      {routes
        .filter((route) => route.display)
        .map((route) => (
          <NavLinkComponent
            path={route.path}
            id={route.iconId}
            section={route.label}
          />
        ))}
    </div>
  );
};

export default NavList;
