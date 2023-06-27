import React from "react";
import { Avatar } from "@mui/material";
import avatar from "../../../assets/img/user.png";
import clsx from "clsx";
import classes from "../ChatPage.module.scss";
import { useAppSelector } from "../../../app/hooks";
import { TChatMessage } from "../ChatPage.types";

const Message: React.FC<{ message: TChatMessage }> = ({ message }) => {
  const authUser = useAppSelector((state) => state.profileReducer.authUser);

  return (
    <div
      className={authUser?.userId === message.userId ? classes.authUser : ""}
    >
      <div className={clsx("user", "user-container", classes.user)}>
        <Avatar src={message.photo || avatar} />
        <div className="about-user">
          <p className="username">{message.userName}</p>
          <p className="unique-name">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
