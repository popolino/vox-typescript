import React, { useEffect, useState } from "react";
import classes from "./Messenger.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import avatar from "../../img/avatar.jpg";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import DialogUser from "./DialogUser";
import DialogWindow from "./DialogWindow";
import { TUser } from "../users/Users.types";

type TMessengerProps = {
  friends: TUser[];
};

const Messenger: React.FC<TMessengerProps> = ({ friends }) => {
  const [selectUser, setSelectUser] = useState<{
    id: number;
    username: string;
    photo: string;
  } | null>(null);
  const handleSelectUser = (id: number, username: string, photo: string) => {
    setSelectUser({ id: id, username: username, photo: photo });
  };
  return (
    <div className={classes.container}>
      <div className={classes["left-container"]}>
        <div className={classes.search}>
          <SvgSelector id="burger" />
          <div className="search">
            <SvgSelector id="search" />
            <input className="search-input" placeholder="Search" type="text" />
          </div>
        </div>
        {friends.map((friend) => (
          <DialogUser
            handleSelectUser={handleSelectUser}
            key={friend.id}
            id={friend.id}
            username={friend.name}
            photo={friend.photos.small}
          />
        ))}
      </div>
      {selectUser && <DialogWindow selectUser={selectUser} />}
    </div>
  );
};

export default Messenger;
