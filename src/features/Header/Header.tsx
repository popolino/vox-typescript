import React from "react";
import classes from "./Header.module.scss";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import Container from "./Container/Container";
import RightSidebar from "./RightSidebar/RightSidebar";
import { TProfile } from "../profile/Profile.types";
import { useBoundActions } from "../../app/store";
import { fetchAuth, fetchLogout } from "../Auth/AuthSlice";
import { fetchFriends } from "../users/usersSlice";
import { appActions, initializeAppThunk } from "../../AppSlice";
import { profileActions } from "../profile/ProfileSlice";
import { useAppSelector } from "../../app/hooks";

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
