import React, { useEffect, useState } from "react";
import classes from "./AboutProfile.module.scss";
import { NavLink } from "react-router-dom";
import { authSlice, fetchAuth } from "../../../Auth/AuthSlice";
import { useAppSelector } from "../../../../app/hooks";
import {
  fetchStatus,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "../../../profile/ProfileSlice";
import { useBoundActions } from "../../../../app/store";

const allActions = {
  fetchUserProfile,
  fetchStatus,
  fetchUpdateStatus,
  fetchAuth,
  ...profileActions,
};
const AboutProfile = (props: any) => {
  const boundActions = useBoundActions(allActions);
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(() => {
  //   if (props.profile && props.profile.userId === props.id)
  //     setAuthUser(props.profile);
  // }, [props.profile]);
  // useEffect(() => );

  const authData = useAppSelector((state) => state.authReducer.authData);
  const profile = useAppSelector((state) => state.profileReducer.profile);

  useEffect(() => {
    authData && boundActions.fetchUserProfile(authData.data.id);
  }, []);
  if (!profile) return <div>loading...</div>;
  return (
    <div className={classes.profile}>
      <div className="user">
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          <img src={profile.photos.small} alt="#" />
        </div>
        <div className="about-user">
          <NavLink to="/profile">
            <div className="username">{profile.fullName}</div>
          </NavLink>
          <div className="unique-name">{`@user${profile.userId}`}</div>
        </div>
      </div>
      <div className={classes.counters}>
        <NavLink to="/friends">
          <div className={classes.counter}>
            {/*<div className={classes.number}>{props.users.length}</div>*/}
            <div className={classes.tittle}>Friends</div>
          </div>
        </NavLink>
        <div className={classes.counter}>
          <div className={classes.number}>568</div>
          <div className={classes.tittle}>Followers</div>
        </div>
        <div className={classes.counter}>
          {/*<div className={classes.number}>{props.wallData.length}</div>*/}
          <div className={classes.tittle}>Posts</div>
        </div>
      </div>
    </div>
  );
};

export default AboutProfile;
