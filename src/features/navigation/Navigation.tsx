import React from "react";
import classes from "./Navigation.module.scss";
import AboutProfile from "./about-profile/AboutProfile";
import NavList from "./navlist/NavList";

const Navigation: React.FC = () => {
  return (
    <nav className={classes.sidebar}>
      <AboutProfile />
      <NavList />
    </nav>
  );
};

export default Navigation;
