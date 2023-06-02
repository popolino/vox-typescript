import React, { useEffect, useState } from "react";
import classes from "./AboutProfile.module.scss";
import { NavLink } from "react-router-dom";
import { authSlice } from "../../../Auth/AuthSlice";

const AboutProfile = (props: any) => {
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(() => {
  //   if (props.profile && props.profile.userId === props.id)
  //     setAuthUser(props.profile);
  // }, [props.profile]);
  useEffect(() => console.log(authSlice.getInitialState().authData));
  return (
    <div className={classes.profile}>
      <div className="user">
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          {/*<img src={authUser && authUser.photos.small} alt="#" />*/}
        </div>
        <div className="about-user">
          <NavLink to="/profile">
            {/*<div className="username">{authUser && authUser.fullName}</div>*/}
          </NavLink>
          <div className="unique-name">
            {/*{authUser && `@user${authUser.userId}`}*/}
          </div>
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
