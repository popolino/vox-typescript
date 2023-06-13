import React, { useEffect, useState } from "react";
import classes from "./AboutProfile.module.scss";
import { NavLink } from "react-router-dom";
import { authSlice, fetchAuth } from "../../../Auth/AuthSlice";
import { useAppSelector } from "../../../../app/hooks";
import avatar from "../../../../img/avatar.jpg";
import {
  fetchStatus,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "../../../profile/ProfileSlice";
import { useBoundActions } from "../../../../app/store";
import { TProfile } from "../../../profile/Profile.types";

const allActions = {
  fetchUserProfile,
  fetchStatus,
  fetchUpdateStatus,
  fetchAuth,
  ...profileActions,
};
const AboutProfile = () => {
  const boundActions = useBoundActions(allActions);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const authUser = useAppSelector((state) => state.profileReducer.authUser);
  const profile = useAppSelector((state) => state.profileReducer.profile);
  const friends = useAppSelector((state) => state.usersReducer.friends);
  const wallData = useAppSelector((state) => state.profileReducer.wallData);

  // const [authUser, setAuthUser] = useState<TProfile | null>(null);

  useEffect(() => {
    authData && boundActions.fetchUserProfile(authData.data.id);
  }, [authData]);
  useEffect(() => {
    if (profile && authData && profile.userId === authData.data.id)
      boundActions.setAuthUser(profile);
  }, [profile, authData]);
  if (!profile) return <div>loading...</div>;
  return (
    <div className={classes.profile}>
      <div className="user">
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          {authUser && (
            <img
              src={authUser.photos ? authUser.photos.small : avatar}
              alt="#"
            />
          )}
        </div>
        <div className="about-user">
          <NavLink to="/profile">
            <div className="username">{authUser && authUser.fullName}</div>
          </NavLink>
          <div className="unique-name">{`@user${profile.userId}`}</div>
        </div>
      </div>
      <div className={classes.counters}>
        <NavLink to="/friends">
          <div className={classes.counter}>
            <div className={classes.number}>{friends.length}</div>
            <div className={classes.tittle}>Friends</div>
          </div>
        </NavLink>
        <div className={classes.counter}>
          <div className={classes.number}>568</div>
          <div className={classes.tittle}>Followers</div>
        </div>
        <div className={classes.counter}>
          <div className={classes.number}>{wallData.length}</div>
          <div className={classes.tittle}>Posts</div>
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;
