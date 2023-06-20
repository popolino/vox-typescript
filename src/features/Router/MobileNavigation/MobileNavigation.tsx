import React from "react";
import classes from "./MobileNavigation.module.scss";
import { IconButton } from "@mui/material";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { TContainer_NavigationProps } from "../Header/Container/Container";
import { NavLink } from "react-router-dom";

const MobileNavigation: React.FC<TContainer_NavigationProps> = ({
  headerTitle,
}) => {
  return (
    <div className={classes.container}>
      <NavLink to="/profile">
        <IconButton
          size="large"
          className={headerTitle === "profile" ? classes.active : ""}
        >
          <SvgSelector id="profile" />
        </IconButton>
      </NavLink>
      <NavLink to="/users">
        <IconButton
          size="large"
          className={headerTitle === "users" ? classes.active : ""}
        >
          <SvgSelector id="friends" />
        </IconButton>
      </NavLink>
      <NavLink to="/messenger">
        <IconButton
          size="large"
          className={headerTitle === "messenger" ? classes.active : ""}
        >
          <SvgSelector id="messenger" />
        </IconButton>
      </NavLink>
      <NavLink to="/music">
        <IconButton
          size="large"
          className={headerTitle === "music" ? classes.active : ""}
        >
          <SvgSelector id="music" />
        </IconButton>
      </NavLink>
      <NavLink to="/videos">
        <IconButton
          size="large"
          className={headerTitle === "videos" ? classes.active : ""}
        >
          <SvgSelector id="videos" />
        </IconButton>
      </NavLink>
    </div>
  );
};

export default MobileNavigation;
