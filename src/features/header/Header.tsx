import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import { useBoundActions } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import LeftSidebar from "./left-sidebar/LeftSidebar";
import Container from "./container/Container";
import RightSidebar from "./right-sidebar/RightSidebar";
import { fetchLogout } from "../auth/AuthSlice";
import { fetchFoundUser, usersActions } from "../users/usersSlice";
import { useLocation } from "react-router-dom";
import { routes } from "../../routes/routes";

const allActions = {
  fetchLogout,
  fetchFoundUser,
  ...usersActions,
};
const Header: React.FC = ({}) => {
  const boundActions = useBoundActions(allActions);

  const authUser = useAppSelector((state) => state.profileReducer.authUser);
  const foundUser = useAppSelector((state) => state.usersReducer.foundUser);
  const headerTitle = useAppSelector((state) => state.usersReducer.headerTitle);

  const [findMode, setFindMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const currentPage = useLocation().pathname;

  const title =
    routes.find((route) => new RegExp(route.path).test(currentPage))?.label ||
    routes[0].label;

  const onLogout = () => {
    boundActions.fetchLogout();
  };
  const handleFindUser = (username: string) => {
    boundActions.fetchFoundUser(username);
  };
  const cleanFoundUser = () => {
    boundActions.cleanFoundUser();
  };
  useEffect(() => {
    boundActions.setHeaderTitle(title);
    if (headerTitle !== "users") {
      boundActions.cleanFoundUser();
      setUsername("");
    }
  }, [title, headerTitle]);

  return (
    <header className={classes.header}>
      <LeftSidebar />
      <Container
        username={username}
        setUsername={setUsername}
        headerTitle={headerTitle}
        findMode={findMode}
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
