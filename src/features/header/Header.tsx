import React from "react";
import classes from "./Header.module.scss";
import { useBoundActions } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import Container from "./container/Container";
import RightSidebar from "./right-sidebar/RightSidebar";
import { fetchLogout } from "../auth/AuthSlice";

export type THeaderProps = {
  currentPage: string;
};

const allActions = {
  fetchLogout,
};
const Header: React.FC<THeaderProps> = ({ currentPage }) => {
  const boundActions = useBoundActions(allActions);

  const authUser = useAppSelector((state) => state.profileReducer.authUser);

  const onLogout = () => {
    boundActions.fetchLogout();
  };
  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container currentPage={currentPage} />
      <RightSidebar onLogout={onLogout} authUser={authUser} />
    </header>
  );
};

export default Header;
