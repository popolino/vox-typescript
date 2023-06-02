import React from "react";
import classes from "./Navigation.module.scss";
import NavList from "./NavList/NavList";
import AboutProfile from "./AboutProfile/AboutProfile";
import { useBoundActions } from "../../../app/store";
import { fetchAuth, fetchLogout } from "../../Auth/AuthSlice";
import { useAppSelector } from "../../../app/hooks";

const allActions = {
  fetchAuth,
  fetchLogout,
};

const Navigation = (props: any) => {
  const boundActions = useBoundActions(allActions);

  const onLogout = () => {
    boundActions.fetchLogout();
  };
  return (
    <nav className={classes.sidebar}>
      <AboutProfile />
      <NavList onLogout={onLogout} />
    </nav>
  );
};

export default Navigation;
