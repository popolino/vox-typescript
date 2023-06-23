import React from "react";
import classes from "./NavList.module.scss";
import { routes } from "../../../routes/routes";
import { NavLinkComponent } from "./NavLinkComponent";

const NavList: React.FC = () => {
  return (
    <div className={classes.navigation}>
      {routes
        .filter((route) => route.display)
        .map((route, i) => (
          <NavLinkComponent
            key={i}
            path={route.path}
            id={route.iconId}
            section={route.label}
          />
        ))}
    </div>
  );
};

export default NavList;
