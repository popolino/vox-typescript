import clsx from "clsx";
import classes from "../Messenger.module.scss";
import avatar from "../../../assets/img/user.png";
import React from "react";

type TDialogUser = {
  id: number;
  username: string;
  photo: string;
  selectUserDialog: {
    id: number | undefined;
    username: string | undefined;
    photo: string | undefined;
  } | null;
  setSelectUserDialog: (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => void;
};

const DialogUser: React.FC<TDialogUser> = ({
  id,
  username,
  photo,
  selectUserDialog,
  setSelectUserDialog,
}) => {
  return (
    <div
      className={clsx("user", classes["user-container"], {
        [classes.active]: selectUserDialog && selectUserDialog.id === id,
      })}
      onClick={() => setSelectUserDialog(id, username, photo)}
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
