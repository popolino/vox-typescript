import React from "react";
import classes from "./Header.module.scss";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import Container from "./Container/Container";
import RightSidebar from "./RightSidebar/RightSidebar";

const Header = () => {
  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container />
      <RightSidebar />
    </header>
  );
};

export default Header;
