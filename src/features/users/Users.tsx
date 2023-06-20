// @ts-ignore
import classes from "./Users.module.scss";
import User from "./User/User";
import avatar from "../../img/avatar.jpg";
import * as React from "react";
import {
  fetchUsers,
  followToUser,
  unFollowToUser,
  usersActions,
} from "./usersSlice";
import { useAppSelector } from "../../app/hooks";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useBoundActions } from "../../app/store";
import Paginator from "../../components/Paginator/Paginator";
import { profileActions } from "../profile/ProfileSlice";
import { IconButton } from "@mui/material";
import SvgSelector from "../../components/svgSelector/SvgSelector";

const allActions = {
  fetchUsers,
  followToUser,
  unFollowToUser,
  ...usersActions,
  ...profileActions,
};

const Users = () => {
  const boundActions = useBoundActions(allActions);

  const users = useAppSelector((state) => state.usersReducer.users);
  const currentPage = useAppSelector((state) => state.usersReducer.currentPage);
  const totalUsersCount = useAppSelector(
    (state) => state.usersReducer.totalUsersCount
  );
  const [pageCount, setPageCount] = useState<number>(10);
  const [paginationMode, setPaginationMode] = useState<boolean>(false);

  const setCurrentId = (id: number) => {
    boundActions.setCurrentUserId(id);
  };

  const handleFollowToUser = (id: number) => {
    boundActions.followToUser(id);
  };
  const handleUnFollowToUser = (id: number) => {
    boundActions.unFollowToUser(id);
  };
  const onPageChanged = (page: number) => {
    boundActions.setCurrentPage(page);
    boundActions.fetchUsers({ currentPage: page, pageCount: pageCount });
  };
  const selectCurrentPage = (page: number) => {
    boundActions.setCurrentPage(page);
  };
  const onPageCountChanged = (count: number) => {
    setPageCount(count);
    boundActions.fetchUsers({ currentPage: currentPage, pageCount: count });
  };

  useEffect(() => {
    boundActions.fetchUsers({ currentPage: currentPage, pageCount: pageCount });
  }, []);

  return (
    <>
      {!paginationMode && (
        <IconButton
          size="large"
          className={classes.arrow}
          onClick={() => setPaginationMode(true)}
        >
          <SvgSelector id="arrow" />
        </IconButton>
      )}
      {paginationMode && (
        <Paginator
          paginationMode={paginationMode}
          setPaginationMode={setPaginationMode}
          totalUsersCount={totalUsersCount}
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          selectCurrentPage={selectCurrentPage}
          onPageCountChanged={onPageCountChanged}
        />
      )}
      <div className={classes.friends}>
        <div className={classes.container}>
          {users.map((user) => (
            <User
              key={user.id}
              setCurrentId={setCurrentId}
              id={user.id}
              name={user.name}
              photos={user.photos.small ? user.photos.small : avatar}
              followed={user.followed}
              handleFollowToUser={handleFollowToUser}
              handleUnFollowToUser={handleUnFollowToUser}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
