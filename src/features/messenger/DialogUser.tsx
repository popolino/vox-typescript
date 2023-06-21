import clsx from "clsx";
import classes from "./Messenger.module.scss";
import avatar from "../../img/user.png";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { TUser } from "../users/Users.types";

type TDialogUser = {
  handleSelectUser: (id: number, username: string, photo: string) => void;
  id: number;
  username: string;
  photo: string;
};

const DialogUser: React.FC<TDialogUser> = ({
  id,
  username,
  photo,
  handleSelectUser,
}) => {
  return (
    <div
      className={clsx("user", classes["user-container"])}
      onClick={() => handleSelectUser(id, username, photo)}
    >
      <div className={`${classes.avatar} sidebar__profile_photo`}>
        <img src={photo ? photo : avatar} alt="#" />
      </div>
      <div className="about-user">
        <p className="username">{username}</p>
        <p className="unique-name">{`@user${id}`}</p>
      </div>
    </div>
  );
};

export default DialogUser;
