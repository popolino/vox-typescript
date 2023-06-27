import React, { useState } from "react";
import classes from "./Header.module.scss";
import { useBoundActions } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import Container from "./container/Container";
import RightSidebar from "./right-sidebar/RightSidebar";
import { fetchLogout } from "../auth/AuthSlice";
import { fetchFoundUser, usersActions } from "../users/usersSlice";

export type THeaderProps = {
  currentPage: string;
};

const allActions = {
  fetchLogout,
  fetchFoundUser,
  ...usersActions,
};
const Header: React.FC<THeaderProps> = ({ currentPage }) => {
  const boundActions = useBoundActions(allActions);

  const authUser = useAppSelector((state) => state.profileReducer.authUser);
  const foundUser = useAppSelector((state) => state.usersReducer.foundUser);

  const [findMode, setFindMode] = useState<boolean>(false);

  const onLogout = () => {
    boundActions.fetchLogout();
  };
  const handleFindUser = (username: string) => {
    boundActions.fetchFoundUser(username);
  };
  const cleanFoundUser = () => {
    boundActions.cleanFoundUser();
  };

  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container
        findMode={findMode}
        currentPage={currentPage}
        foundUser={foundUser}
        handleFindUser={handleFindUser}
        cleanFoundUser={cleanFoundUser}
        setFindMode={setFindMode}
      />
      <RightSidebar onLogout={onLogout} authUser={authUser} />
    </header>
  );
};

export default Header;
