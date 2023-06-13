import React from "react";
import classes from "./Header.module.scss";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import Container from "./Container/Container";
import RightSidebar from "./RightSidebar/RightSidebar";
import { TProfile } from "../../profile/Profile.types";

export type THeaderProps = {
  authUser: TProfile | null;
};

const Header: React.FC<THeaderProps> = ({ authUser }) => {
  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container />
      <RightSidebar authUser={authUser} />
    </header>
  );
};

export default Header;
