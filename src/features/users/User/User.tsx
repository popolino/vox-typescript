// @ts-ignore
import React from "react";
// @ts-ignore
import classes from "./User.module.scss";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";

type TUserProps = {
  id: number;
  name: string;
  photos: string;
  followed: boolean;
  handleFollowToUser: (id: number) => void;
  handleUnFollowToUser: (id: number) => void;
  setCurrentId: (id: number) => void;
};

const User: React.FC<TUserProps> = ({
  id,
  name,
  photos,
  followed,
  handleFollowToUser,
  handleUnFollowToUser,
  setCurrentId,
}) => {
  return (
    <div className={classes.friend}>
      <div className={clsx("avatar", classes.avatar)}>
        <NavLink to={`/profile/${id}`} onClick={() => setCurrentId(id)}>
          <img src={photos} alt="" />
        </NavLink>
      </div>
      <p>{name}</p>
      {!followed ? (
        <button
          // disabled={followingInProgress.some((userId) => userId === id)}
          className="button-blue"
          onClick={() => {
            handleFollowToUser(id);
          }}
        >
          Follow
        </button>
      ) : (
        <button
          className="button-gray"
          // disabled={followingInProgress.some((id) => id === id)}
          onClick={() => {
            handleUnFollowToUser(id);
          }}
        >
          Unfollow
        </button>
      )}
    </div>
  );
};

export default User;
