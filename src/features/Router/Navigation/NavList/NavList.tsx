import React from "react";
import classes from "./NavList.module.scss";
import { NavLinkComponent } from "./NavLinkComponent";
import { Navigate } from "react-router";
import { useBoundActions } from "../../../../app/store";
import { fetchLogout } from "../../../Auth/AuthSlice";

const NavList = () => {
  return (
    <div className={classes.navigation}>
      <NavLinkComponent path="/users" id="friends" section="Users" />
      <NavLinkComponent path="/messenger" id="messenger" section="Messenger" />
      <NavLinkComponent
        path="/communities"
        id="communities"
        section="Communities"
      />
      <NavLinkComponent path="/music" id="music" section="Music" />
      <NavLinkComponent path="/videos" id="videos" section="Videos" />
      <NavLinkComponent path="/feed" id="feed" section="Feed" />
      <NavLinkComponent path="/settings" id="settings" section="Settings" />
    </div>
  );
};

export default NavList;
