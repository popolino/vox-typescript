import React from "react";
import classes from "./Header.module.scss";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import Container from "./Container/Container";
import RightSidebar from "./RightSidebar/RightSidebar";
import { TProfile } from "../../profile/Profile.types";

export type THeaderProps = {
  authUser: TProfile | null;
  onLogout: () => void;
  headerTitle: string;
};

const Header: React.FC<THeaderProps> = ({
  authUser,
  onLogout,
  headerTitle,
}) => {
  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container headerTitle={headerTitle} />
      <RightSidebar onLogout={onLogout} />
    </header>
  );
};

export default Header;
